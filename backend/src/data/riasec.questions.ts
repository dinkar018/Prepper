export interface Question {
  id: string;
  text: string;
  category: string;
}
export const RIASEC_QUESTIONS: Question[] = [
  { id: 'R1', text: 'I enjoy working with tools, machines, or equipment.', category: 'R' },
  { id: 'R2', text: 'I like being outdoors and doing physical work.', category: 'R' },
  { id: 'I1', text: 'I love solving complex math problems or logic puzzles.', category: 'I' },
  { id: 'I2', text: 'I enjoy conducting scientific experiments or research.', category: 'I' },
  { id: 'A1', text: 'I like creating original works of art, music, or writing.', category: 'A' },
  { id: 'A2', text: 'I enjoy designing clothes, interiors, or websites.', category: 'A' },
  { id: 'S1', text: 'I find fulfillment in helping people solve their problems.', category: 'S' },
  { id: 'S2', text: 'I like teaching or explaining things to others.', category: 'S' },
  { id: 'E1', text: 'I enjoy leading a team or starting new projects.', category: 'E' },
  { id: 'E2', text: 'I am comfortable persuading people or selling ideas.', category: 'E' },
  { id: 'C1', text: 'I like keeping records, files, or data organized.', category: 'C' },
  { id: 'C2', text: 'I prefer following a structured routine or set of rules.', category: 'C' },
];
