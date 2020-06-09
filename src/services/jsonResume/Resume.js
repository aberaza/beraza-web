const CONTACT2LABEL = {
  email : 'Personal E-Mail',
  website: 'Personal WebPage',
  phone: 'Main Phone'
};

export class Profile{
  constructor({label, image, quote, characterClass, summary, degree, name, picture} = {}){
    this.name = name;
    this.degree = degree;
    this.picture = picture || image;
    this.label = label;
    this.quote = quote;
    this.type = degree || characterClass || label;
    this.summary = summary;
  }
}

export class Location{
  constructor({address, postalCode, code, city, country, countryCode, region, label} = {label: "Main Address"}){
    this.label = label;
    this.addres = address;
    this.postalCode = postalCode||code;
    this.city = city;
    this.region = region;
    this.countryCode = countryCode ||country;
  }
}

export class Contact{
  constructor ({label, type, value}={}){
    this.label = label || CONTACT2LABEL[type] || "";
    this.type = type;
    this.value = value;
  }
}

export class Social{
  constructor({label, network, user, username, url} = {}){
    this.label = label;
    this.username = username || user;
    this.network = network;
    this.url = url;
  }
}

export class Work{
  constructor({employer, company, url, website, position, start, end, startDate, endDate, summary, highlights, keywords} = {}){
    this.company = company || employer;
    this.position = position;
    this.summary = summary;
    this.start = new Date(start||startDate);
    this.end = new Date(end || endDate);
    this.website = website || url;
    this.highlights = highlights;
    this.keywords = keywords;    
  }
}

let knownSkills = new Map();
export class Skill {
  static getSkillByName(skill = ''){
    let key = skill.toLowerCase();
    return knownSkills.has(key)? knownSkills.get(key) : new Skill({name: skill});
  }

  constructor( skill = {skills: null, keywords: null, name: ''}){
    let key = skill.name.toLowerCase();
    var that = knownSkills.has(key)
      ? knownSkills.get(key)
      : this;
    
    let {name, level, skills, keywords, summary} = {...that, ...skill};
    let subskills = skills||keywords;

    that.name = name;
    that.key = key;
    that.level = level;
    that.summary = summary;
    that.skills = subskills? subskills.map(Skill.getSkillByName) : null ;
    knownSkills.set(key, that);
    return that;
  }
}

export class Education{
  constructor( {institution, title, area, studyType, start, startDate, end, endDate, summary, grade, gpa } = {}) {
    this.institution = institution;
    this.title = title || area;
    this.type = studyType;
    this.start = new Date(start || startDate);
    this.end = new Date(end|| endDate);
    this.summary = summary;
    this.grade = grade || gpa;
  }
}

export class Resume {
  constructor(resume = {}){
    this.raw = resume;
  }

  get profile() { return new Profile(); }

  get location() { return []; }

  get contact() { return []; }

  get social() { return []; }

  get work() { return []; }

  get skills () { return []; }

  get education () { return []; }
}

export default Resume;

