import {
  generateEdgeId,
  generateFacultyId,
  generateRoomId,
  generateNodeId,
  generateSubjectId,
} from "#services/ai-services/libs/workflow.lib.js";

test("should generate all ids correctly", () => {
  expect(generateNodeId()).toMatch(/^NODE_/);
  expect(generateEdgeId()).toMatch(/^EDGE_/);
  expect(generateFacultyId()).toMatch(/^FACULTY_/);
  expect(generateSubjectId()).toMatch(/^SUBJECT_/);
  expect(generateRoomId()).toMatch(/^ROOM_/);
});

test("ids should be unique", () => {
  const id1 = generateNodeId();
  const id2 = generateNodeId();

  expect(id1).not.toBe(id2);
});