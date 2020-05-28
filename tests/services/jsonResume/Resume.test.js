import Resume, { Skill } from '/src/services/jsonResume/Resume'

describe('Resume Basic Tests', () => {
  const testResume = new Resume({name: "test_name"});

  test('Resume is a class', () => {
    let resume = new Resume();
    expect(resume).toBeTruthy();
  });


  test('Resume objects expose raw property', () => {
    expect(testResume.raw).toBeDefined();
    expect(testResume.raw.name).toBe("test_name");
  })

});

describe('Skill Basic Tests', () => {
  const testSkill = new Skill ({name: 'TestSkill', level: 'MasterLord', summary: 'Lord of Lords, Light in the shadow'});

  test('Skill objects have name, level, summary and skills properties', () => {
    expect(testSkill.name).toBeDefined();
    expect(testSkill.level).toBeDefined();
    expect(testSkill.summary).toBeDefined();
    expect(testSkill.skills).toBeDefined();
  });

  test('Skills are singletones using lowercased name as key', () => {
    let testSkillB = new Skill ( {name: 'TestSkill'});
    let testSkillC = Skill.getSkillByName('TestSkill');
    expect(testSkill).toBe(testSkillB);
    expect(testSkill).toBe(testSkillC);
  })

  test('Skill skills looks for existing instances of skill by name', ()=>{
    let testSet = new Skill({name: 'TestSet', level: 'Beyond limits', skills: ['TestSkill', 'AnotherSkill']});
    expect(testSet.skills.length).toBe(2);
    expect(testSet.skills[0]).toBe(testSkill);
    expect(testSet.skills[1]).toBeInstanceOf(Skill);
  })
});
