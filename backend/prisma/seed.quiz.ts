import prisma from "../src/prisma/client";

async function seedQuiz() {
  // 1️⃣ Find RIASEC assessment
  const riasec = await prisma.assessment.findUnique({
    where: { name: "RIASEC" },
  });

  if (!riasec) {
    throw new Error("RIASEC assessment not found. Seed it first.");
  }

  // 2️⃣ Create Quiz
  const quiz = await prisma.quiz.upsert({
    where: { title: "Career Aptitude Quiz" },
    update: {},
    create: {
      title: "Career Aptitude Quiz",
      description: "RIASEC-based career aptitude assessment",
    },
  });

  // 3️⃣ Attach Assessment to Quiz
  await prisma.quizAssessment.upsert({
    where: {
      quizId_assessmentId: {
        quizId: quiz.id,
        assessmentId: riasec.id,
      },
    },
    update: {
      order: 1,
    },
    create: {
      quizId: quiz.id,
      assessmentId: riasec.id,
      order: 1,
    },
  });

  console.log("Quiz seeded with RIASEC assessment");
}

seedQuiz()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
