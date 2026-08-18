(() => {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".strength-card"));
  const summary = document.querySelector("#selection-summary");
  const modal = document.querySelector("#evidence-modal");
  const modalPanel = modal?.querySelector(".modal-panel");
  const openEvidenceButtons = Array.from(document.querySelectorAll(".evidence-button"));
  const closeEvidenceButton = document.querySelector("#close-evidence");
  const evidenceTitle = document.querySelector("#evidence-title");
  const evidenceSummary = document.querySelector("#evidence-summary");
  const evidencePrivacy = document.querySelector("#evidence-privacy");
  const evidenceLink = document.querySelector("#evidence-link");
  let lastFocusedElement = null;

  const evidenceData = {
    sincere: {
      title: "자료 공유 약속 이행 메모",
      summary: "“4주 동안 약속한 자료 공유 8회를 모두 지켰고, 팀은 최종 마감 이틀 전에 제출을 마쳤다.”",
      privacy: "이름을 제외한 식별 정보는 제거하거나 마스킹하고 결과 문장만 공개했습니다.",
      href: "evidence.html",
    },
    diligent: {
      title: "아침 운동 습관 기록",
      summary: "“전날 미리 준비하고 정한 시간에 일어나 운동한 날을 기록하며, 아침 운동을 꾸준한 생활 습관으로 만들었다.”",
      privacy: "생활 위치와 연락처 전체값 없이 습관을 만든 과정과 결과만 공개했습니다.",
      href: "evidence-diligent.html",
    },
    observe: {
      title: "CTF 워게임 풀이 관찰 기록",
      summary: "“허가된 CTF 워게임에서 문제 설명과 화면 반응을 세밀하게 비교해 단서를 찾고, 이를 연결해 문제를 해결했다.”",
      privacy: "계정·대회명·접속 주소·정답 값 없이 관찰 과정과 결과만 공개했습니다.",
      href: "evidence-observe.html",
    },
  };

  const selectCard = (selectedCard) => {
    cards.forEach((card) => {
      const isSelected = card === selectedCard;
      const button = card.querySelector(".select-button");

      card.classList.toggle("is-selected", isSelected);
      button?.setAttribute("aria-pressed", String(isSelected));
      if (button) {
        button.textContent = isSelected ? "선택됨" : "이 강점 선택";
      }
    });

    if (summary) {
      summary.textContent = `지금 보는 강점 — ${selectedCard.dataset.strength}`;
    }
  };

  cards.forEach((card) => {
    const button = card.querySelector(".select-button");
    button?.addEventListener("click", () => selectCard(card));
  });

  const openModal = (evidenceKey) => {
    if (!modal) return;
    const selectedEvidence = evidenceData[evidenceKey];
    if (!selectedEvidence) return;
    lastFocusedElement = document.activeElement;
    if (evidenceTitle) evidenceTitle.textContent = selectedEvidence.title;
    if (evidenceSummary) evidenceSummary.textContent = selectedEvidence.summary;
    if (evidencePrivacy) evidencePrivacy.textContent = selectedEvidence.privacy;
    if (evidenceLink) evidenceLink.setAttribute("href", selectedEvidence.href);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalPanel?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  openEvidenceButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.evidence));
  });
  closeEvidenceButton?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
