import { JsonFresh } from '/src/services/jsonResume/jsonFresh';
import Resume, { Profile, Contact, Location, Social, Work, Skill, Education} from '/src/services/jsonResume';

import * as resume from './jane-fullstacker.fresh.json';

describe('JsonFresh Basic Tests', () => {
  var freshResume = null;
  beforeAll(()=>{
    freshResume = new JsonFresh(resume);
  });

  test('Gets a JSON FRESH RESUME object as constructor input', () => {
    let _freshResume = new JsonFresh(resume);
    expect(_freshResume).toBeTruthy();
    expect(_freshResume instanceof Resume).toBeTruthy();
    expect(_freshResume instanceof JsonFresh).toBeTruthy();
  });


  test('profile getter returns a Profile object', () => {
    let profile = freshResume.profile;
    expect (profile instanceof Profile).toBeTruthy();
  });

  test("skills getter returns a structure with sets of skills and individual subskills", () => {
    let {sets, skill} = freshResume.skills;
    expect(sets).toBeDefined();
    expect(sets[0]).toBeInstanceOf(Skill);
    expect(sets[0].skills[0]).toBeInstanceOf(Skill);
    console.dir(sets[4])
    console.dir(skill)
    
    expect(skill).toBeDefined();
    expect(skill[0]).toBeInstanceOf(Skill);
    expect(skill[0].skills).toBeFalsy();
  });
  
  test.each`
    getter | outputType
    ${'education'} | ${Education}
    ${'work'} | ${Work} 
    ${'social'} | ${Social} 
    ${'contact'} | ${Contact}
    ${'location'} | ${Location}
  `('Getter $getter returns an array of $output_type', ({getter, outputType}) => {
    expect(freshResume[getter]).toBeDefined();
    expect(freshResume[getter] instanceof Array).toBeTruthy();
    expect(freshResume[getter].pop() instanceof outputType).toBeTruthy();
  });
}); 
