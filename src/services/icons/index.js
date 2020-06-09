import SKILL_LOGOS from './skillLogos.dict.js';

const DEFAULT_TEMPLATE = "logoModel.svg.tmplt";
const ICON_TEMPLATE = "logoOnlyModel.svg.tmplt";
const DEVICON_PATH = "assets/devicons/icons/";

const CACHED_TEMPLATES = {};

const COLOR_PALETTE=[
  '#F94144',
  '#F3722C',
  '#F8961E',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#577590'
];


const LONG2SHORT = {
  javascript : "JS",
  node : "npm",
  python: "Py",
  actionscript: "AS",
}
  

export const getSkillLogoUrl = (skill = {}) => {
  const name = skill.key;

  const logo = SKILL_LOGOS[name];
  if(logo !== undefined){
    return Promise.resolve(DEVICON_PATH + (logo instanceof Array? logo.join('-') : ((logo || name) + '-original')) + '.svg');
  }
  
  return getSkillLogo(skill, true)
    .then(logo => URL.createObjectURL(new Blob([logo], {type: 'image/svg+xml'})))
}

async function getTemplate(name = DEFAULT_TEMPLATE){
  let template = CACHED_TEMPLATES[name]? await Promise.resolve(CACHED_TEMPLATES[name]) : await fetch('/assets/icons/' + name).then(r => r.text());

  return template;
}

const prop = /%(\w+)%/g;

export function parseTemplate(template, data={width:"100%", height: "100%"}){
  let result = template.replace(prop, (match, matches) => (data[matches] || match));
  return result;
}

export async function getSkillLogo(skill={name:''}, logoOnly=false){
  let template = await getTemplate(logoOnly?ICON_TEMPLATE : DEFAULT_TEMPLATE);
  let props = {
    long : skill.name,
    short : LONG2SHORT[skill.key] || skill.name.length <=3 ? skill.name : skill.name[0],
    color: COLOR_PALETTE[skill.name.charCodeAt(0) % COLOR_PALETTE.length] 
  }
  return parseTemplate(template, props);
}
