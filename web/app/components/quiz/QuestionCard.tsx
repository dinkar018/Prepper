"use client";

export default function QuestionCard({
  question,
  current,
  total,
  selected,
  onSelect,
  onNext,
  isLast,
}: any) {
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <p>
        Question {current} / {total}
      </p>

      <h3>{question.text}</h3>

      {question.options.map((opt: any) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          style={{
            display: "block",
            margin: "8px 0",
            background:
              selected === opt.id ? "#d1e7dd" : "#f8f9fa",
          }}
        >
          {opt.text}
        </button>
      ))}

      <button disabled={!selected} onClick={onNext}>
        {isLast ? "Submit" : "Next"}
      </button>
    </div>
  );
}
