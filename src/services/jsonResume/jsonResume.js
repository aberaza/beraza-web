import { Resume, Profile, Location, Contact, Social, Work, Skill, Education } from './index';

const CONTACT_TYPES = ['email', 'phone', 'website'];


export class JsonResume extends Resume{
  constructor(resume = {}){
    super(resume);
  }


  get profile() {
    return new Profile(this.raw.basics);
  }

  get location() {
    return [new Location(this.raw.basics.location)];
  }

  get contact() {
    return CONTACT_TYPES.map( type => new Contact( {type, value : this.raw.basics[type]}))
  }

  get social() {
    let results = this.raw.social.map(profile => new Social(profile));
    if(this.raw.basics.website){
      results.push(new Social({network: 'WebSite', label: 'Personal WebSite', url: this.raw.basics.website}));
    }
    return results;
  }
  
  get work() {
    return this.raw.work.map(post => new Work(post));
  }


  get skills(){
    return { sets : this.raw.skills.map( skill => new Skill(skill)) };
  }

  get education() {
    return this.raw.education.map(study => new Education(study));
  }

}

extractKeywordsRegex =/^keywords\s*[:,=](?:\s*([\w\d\s]+)[,\.\s]*)+$/ig
detectKeywordsRegex = /^keywords\s*[:,=]/i
function extractKeywords(sentences){
  return [...(sentences.find(sentence => sentence.test(detectKeywordsRegex)) || "").matchAll(extractKeywordsRegex)];
}

