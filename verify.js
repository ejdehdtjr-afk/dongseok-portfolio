(() => {
  "use strict";
  const errors = [];
  const byId = (id) => document.getElementById(id);
  const setState = (name, passed) => {
    const card = document.querySelector(`[data-check="${name}"]`);
    card?.classList.toggle("is-pass", passed);
    card?.classList.toggle("is-fail", !passed);
  };
  const renderErrors = () => {
    const count = errors.length;
    if (byId("console-value")) byId("console-value").textContent = `${count}건`;
    if (byId("console-detail")) byId("console-detail").textContent = count ? errors[0] : "현재 페이지에서 감지된 오류가 없습니다.";
    setState("console", count === 0);
  };
  window.addEventListener("error", (event) => { errors.push(event.message || "알 수 없는 오류"); renderErrors(); });
  window.addEventListener("unhandledrejection", (event) => { errors.push(String(event.reason || "처리되지 않은 Promise 오류")); renderErrors(); });
  const runChecks = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const documentWidth = document.documentElement.scrollWidth;
    const required = (width === 1366 && height === 768) || (width === 1920 && height === 1080);
    byId("viewport-value").textContent = `${width} × ${height}`;
    byId("viewport-detail").textContent = required ? "과제 지정 해상도입니다. 통과" : "기록용 화면은 1366×768 또는 1920×1080으로 맞추세요.";
    setState("viewport", required);
    const overflow = Math.max(0, documentWidth - width);
    byId("overflow-value").textContent = overflow === 0 ? "0px · 통과" : `${overflow}px · 확인 필요`;
    byId("overflow-detail").textContent = `문서 ${documentWidth}px / 화면 ${width}px`;
    setState("overflow", overflow === 0);
    renderErrors();
  };
  let count = 0;
  const testButton = byId("interaction-test-button");
  testButton?.addEventListener("click", () => {
    count += 1;
    const active = count % 2 === 1;
    testButton.setAttribute("aria-pressed", String(active));
    testButton.textContent = active ? "실행 완료 — 다시 누르면 초기화" : "검사 버튼 실행";
    byId("interaction-result").textContent = `${count}회 실행됨 · 마우스와 키보드 기본 동작 지원`;
  });
  byId("rerun-checks")?.addEventListener("click", runChecks);
  window.addEventListener("resize", runChecks);
  runChecks();
})();
