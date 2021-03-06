import { occupations } from '../constants/app';

let id = 0;

export function GetNewEmployee(name, occupation , isActive) {
  id++;

  return {
    name,
    type: 'employee',
    x: 0,
    y: 0,
    floor: null,
    occupation,
    isHighlited: false,
    email: 'dummy@email.com',
    slack: 'slackDummy',
    slackLink: 'https://innovaco.slack.com/team/U5Q1H3KK6',
    isActive,
    id: id.toString(),
  }
}

export default [
  new GetNewEmployee(`Гатц`, occupations.support.name, true),
  new GetNewEmployee(`Миша`, occupations.frontend.name),
  new GetNewEmployee(`Раф`, occupations.backend.name),
  new GetNewEmployee(`Женя`, occupations.backend.name),
  new GetNewEmployee(`Артур`, occupations.backend.name),
  new GetNewEmployee(`Костя`, occupations.frontend.name),
  new GetNewEmployee(`Таня`, occupations.qa.name),
  new GetNewEmployee(`Саша`, occupations.backend.name),
  new GetNewEmployee(`Руслан`, occupations.frontend.name),
  new GetNewEmployee(`Вадим`, occupations.frontend.name),
  new GetNewEmployee(`Женя`, occupations.qa.name),
]