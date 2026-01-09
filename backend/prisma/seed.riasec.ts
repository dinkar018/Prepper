import prisma from "../src/prisma/client";
import { RIASEC_QUESTIONS } from "../src/data/riasec.questions";

async function seedRIASEC() {
  /* 1️⃣ Assessment */
  const assessment = await prisma.assessment.upsert({
    where: { name: "RIASEC" },
    update: {},
    create: {
      name: "RIASEC",
      type: "RIASEC",
      uiType: "SWIPE_CARD",
    },
  });

  /* 2️⃣ Traits */
  const traitCodes = ["R", "I", "A", "S", "E", "C"];

  const traits = await Promise.all(
    traitCodes.map((code) =>
      prisma.trait.upsert({
        where: {
          code_assessmentId: {
            code,
            assessmentId: assessment.id,
          },
        },
        update: {},
        create: {
          code,
          name: code,
          assessmentId: assessment.id,
        },
      })
    )
  );

  const traitMap = Object.fromEntries(traits.map(t => [t.code, t]));

  /* 3️⃣ Questions */
  for (const q of RIASEC_QUESTIONS) {
    const question = await prisma.question.create({
      data: {
        code: q.id,            // "R1", "I2", etc
        text: q.text,
        type: "BINARY",
        assessmentId: assessment.id,
      },
    });

    /* 4️⃣ Options */
    const agree = await prisma.option.create({
      data: {
        text: "Agree",
        score: 1,
        questionId: question.id,
      },
    });

    const disagree = await prisma.option.create({
      data: {
        text: "Disagree",
        score: 0,
        questionId: question.id,
      },
    });

    /* 5️⃣ Question → Trait */
    await prisma.questionTrait.create({
      data: {
        questionId: question.id,
        traitId: traitMap[q.category].id,
        weight: 1,
      },
    });
  }

  console.log("RIASEC seeded");
}

seedRIASEC()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

