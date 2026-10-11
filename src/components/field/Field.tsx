"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { buildShapes, framing, shapeForPath, type ShapeName } from "./shapes";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uWave;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uAspect;
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRand;
  attribute float aFlagFrom;
  attribute float aFlagTo;
  varying float vFlag;
  varying float vLight;
  varying float vDepth;

  float stagger(float p, float r) {
    float t = clamp(p * 1.5 - r * 0.5, 0.0, 1.0);
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float p = stagger(uProgress, aRand);
    vec3 pos = mix(aFrom, aTo, p);
    // swirl while in flight
    float flight = sin(3.14159 * p);
    pos += flight * 0.6 * vec3(sin(aRand * 40.0), cos(aRand * 25.0), sin(aRand * 60.0));
    // idle drift
    pos += 0.025 * vec3(
      sin(uTime * 0.6 + aRand * 30.0),
      cos(uTime * 0.5 + aRand * 20.0),
      sin(uTime * 0.4 + aRand * 10.0));
    // travelling wave (used by the research plane)
    pos.y += uWave * sin(pos.x * 1.1 + uTime * 0.9) * cos(pos.z * 0.9 + uTime * 0.6);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float f = smoothstep(0.32, 0.0, dist) * uMouseStrength;
    mv.xy += normalize(d + 1e-5) * f * 0.28;
    gl_Position = projectionMatrix * mv;

    vFlag = mix(aFlagFrom, aFlagTo, p);
    vLight = f;
    vDepth = clamp((-mv.z - 3.0) / 9.0, 0.0, 1.0);
    float size = uSize * (0.55 + aRand * 0.9) * (1.0 + f * 1.4) * (1.0 + vFlag * 0.6);
    gl_PointSize = size * uPixelRatio / -mv.z;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vFlag;
  varying float vLight;
  varying float vDepth;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.05, r);
    vec3 col = mix(uColorA, uColorB, vFlag);
    float alpha = a * uOpacity * (1.0 - vDepth * 0.65) * (0.75 + vLight * 0.8 + vFlag * 0.35);
    gl_FragColor = vec4(col, alpha);
  }
`;

const PALETTE = {
  dark: { a: "#8fe8d0", b: "#ffb547", opacity: 0.85, blending: THREE.AdditiveBlending },
  light: { a: "#16413a", b: "#c46a00", opacity: 0.75, blending: THREE.NormalBlending },
};

function staggerJS(p: number, r: number) {
  const t = Math.min(1, Math.max(0, p * 1.5 - r * 0.5));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Field() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const setShapeRef = useRef<(s: ShapeName) => void>(() => {});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      mount.dataset.fallback = "true";
      return; // no WebGL — CSS background still looks fine
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 760;
    const N = small ? 5200 : 10000;

    const pr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const shapes = buildShapes(N);
    let current: ShapeName = shapeForPath(window.location.pathname);

    const geo = new THREE.BufferGeometry();
    const from = new Float32Array(shapes[current].positions);
    const to = new Float32Array(shapes[current].positions);
    const flagFrom = new Float32Array(shapes[current].flags);
    const flagTo = new Float32Array(shapes[current].flags);
    const rand = new Float32Array(N);
    for (let i = 0; i < N; i++) rand[i] = Math.random();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute("aFrom", new THREE.BufferAttribute(from, 3));
    geo.setAttribute("aTo", new THREE.BufferAttribute(to, 3));
    geo.setAttribute("aFlagFrom", new THREE.BufferAttribute(flagFrom, 1));
    geo.setAttribute("aFlagTo", new THREE.BufferAttribute(flagTo, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 1 },
      uSize: { value: small ? 26 : 30 },
      uPixelRatio: { value: pr },
      uWave: { value: framing[current].wave },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseStrength: { value: 0 },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uOpacity: { value: 0.85 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    let baseOpacity = 0.85;
    const applyTheme = () => {
      const t = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      const pal = PALETTE[t];
      uniforms.uColorA.value.set(pal.a);
      uniforms.uColorB.value.set(pal.b);
      baseOpacity = pal.opacity;
      uniforms.uOpacity.value = pal.opacity;
      material.blending = pal.blending;
      material.needsUpdate = true;
      if (reduced) renderOnce();
    };

    const points = new THREE.Points(geo, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // framing state (lerped toward targets each frame)
    const frame = { ...framing[current] };
    let spinAngle = 0;

    const layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uAspect.value = aspect;
    };

    const targetFor = (s: ShapeName) => {
      const f = framing[s];
      const aspect = window.innerWidth / window.innerHeight;
      if (aspect < 0.9) {
        // portrait / phone: centre the object and sit it behind the heading
        return { ...f, x: 0, y: f.y + 1.2, scale: f.scale * 0.72 };
      }
      if (aspect < 1.35) return { ...f, x: f.x * 0.55, scale: f.scale * 0.85 };
      return f;
    };

    const setShape = (next: ShapeName) => {
      if (next === current) return;
      const p = uniforms.uProgress.value;
      // freeze the in-flight positions as the new starting point
      for (let i = 0; i < N; i++) {
        const k = staggerJS(p, rand[i]);
        for (let j = 0; j < 3; j++) {
          const idx = i * 3 + j;
          from[idx] = from[idx] + (to[idx] - from[idx]) * k;
        }
        flagFrom[i] = flagFrom[i] + (flagTo[i] - flagFrom[i]) * k;
      }
      to.set(shapes[next].positions);
      flagTo.set(shapes[next].flags);
      (["aFrom", "aTo", "aFlagFrom", "aFlagTo"] as const).forEach(
        (n) => ((geo.getAttribute(n) as THREE.BufferAttribute).needsUpdate = true),
      );
      uniforms.uProgress.value = reduced ? 1 : 0;
      current = next;
      if (reduced) {
        Object.assign(frame, targetFor(next));
        renderOnce();
      }
    };
    setShapeRef.current = setShape;

    // pointer
    const mouse = { x: 9, y: 9, tx: 9, ty: 9, active: false };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.active = e.pointerType === "mouse";
    };
    const onLeave = () => (mouse.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let scrollY = window.scrollY;
    const onScroll = () => (scrollY = window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      layout();
      if (reduced) renderOnce();
    };
    window.addEventListener("resize", onResize);

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const update = (dt: number, t: number, wall = dt) => {
      uniforms.uTime.value = t;
      // morph progress follows wall-clock time so slow devices still finish on schedule
      if (uniforms.uProgress.value < 1) uniforms.uProgress.value = Math.min(1, uniforms.uProgress.value + wall / 2.2);

      const target = targetFor(current);
      const k = 1 - Math.pow(0.03, dt);
      (Object.keys(frame) as (keyof typeof frame)[]).forEach((key) => {
        frame[key] += (target[key] - frame[key]) * k;
      });
      uniforms.uWave.value = frame.wave;

      spinAngle += dt * frame.spin;
      const scrollFactor = Math.min(scrollY / window.innerHeight, 3);
      // recede once the visitor is reading, so content always wins
      uniforms.uOpacity.value = baseOpacity * (1 - Math.min(scrollFactor, 1) * 0.55);
      mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 6);
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 6);
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uMouseStrength.value += ((mouse.active ? 1 : 0) - uniforms.uMouseStrength.value) * Math.min(1, dt * 3);

      group.position.set(frame.x, frame.y + scrollFactor * 0.35, 0);
      group.scale.setScalar(frame.scale);
      group.rotation.set(
        frame.rotX + mouse.y * 0.08 * uniforms.uMouseStrength.value + scrollFactor * 0.12,
        frame.rotY + spinAngle + Math.sin(t * 0.12) * frame.sway + mouse.x * 0.12 * uniforms.uMouseStrength.value + scrollFactor * 0.25,
        0,
      );
    };

    const renderOnce = () => {
      update(0, 0);
      Object.assign(frame, targetFor(current));
      update(0, 0);
      renderer.render(scene, camera);
    };

    const tick = () => {
      if (!running) return;
      const raw = clock.getDelta();
      const dt = Math.min(raw, 0.05);
      update(dt, clock.elapsedTime, Math.min(raw, 0.25));
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    layout();
    Object.assign(frame, targetFor(current));
    applyTheme();
    if (reduced) {
      renderOnce();
    } else {
      // gentle entrance: assemble from a scattered cloud
      for (let i = 0; i < N * 3; i++) from[i] = (Math.random() - 0.5) * 14;
      (geo.getAttribute("aFrom") as THREE.BufferAttribute).needsUpdate = true;
      uniforms.uProgress.value = 0;
      raf = requestAnimationFrame(tick);
    }
    mount.dataset.ready = "true";

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    setShapeRef.current(shapeForPath(pathname || "/"));
  }, [pathname]);

  return <div ref={mountRef} className="field" aria-hidden="true" />;
}
