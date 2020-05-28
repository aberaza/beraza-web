import { Resume, Profile, Location, Contact, Social, Work, Skill, Education } from './Resume';

const CONTACT_TYPES = ['email', 'phone', 'website'];

export class JsonFresh extends Resume {
  constructor(resume = {}){
    super(resume);
  }

  get profile() {
    return new Profile({...this.raw.info, name: this.raw.name, degree: this.raw.education.degree});
  }

  get location() {
    return [new Location(this.raw.location)];
  }

  get contact() {
    return CONTACT_TYPES.map( 
      type =>  new Contact({type, value: this.raw.basics[type]})
    ).concat(
      this.raw.contact.other.map(c => new Contact(c) )
    );
  }

  get social() {
    let results = super.social;
    if(this.raw.contact.website){
      results.push(new Social({network: 'WebSite', label:'Persona WebSite',url: this.raw.contact.website}));
    }
    return results;
  }
  
  get work() {
    return this.raw.employment.history.map(post => new Work(post));
  }


  get skills(){
    return { 
      skill : this.raw.skills.list.map(skill => new Skill(skill)),
      sets : this.raw.skills.sets.map(set => new Skill(set))
    };
    //Skill gives individual extra information about individual skills on any set
  }

  get education() {
    return this.raw.education.map(study => new Education(study));
  }
}
