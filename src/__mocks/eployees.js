import { occupations } from '../constants/app';

function GetNewEmployee(name, occupation, coords, isActive) {
  return {
    name,
    coords,
    occupation,
    isHighlited: false,
    email: 'dummy@email.com',
    slack: 'slackDummy',
    slackLink: 'https://innovaco.slack.com/team/U5Q1H3KK6',
    isActive
  }
}

export default [
  new GetNewEmployee(`Гатц`, occupations.support.name, {x: 0, y: 13}, true),
  new GetNewEmployee(`Миша`, occupations.frontend.name, {x: 1, y: 15}),
  new GetNewEmployee(`Раф`, occupations.backend.name, {x: 4, y: 15}),
  new GetNewEmployee(`Женя`, occupations.backend.name, {x: 4, y: 17}),
  new GetNewEmployee(`Артур`, occupations.backend.name, {x: 4, y: 16}),
  new GetNewEmployee(`Костя`, occupations.frontend.name, {x: 0, y: 15}),
  new GetNewEmployee(`Таня`, occupations.qa.name, {x: 0, y: 16}),
  new GetNewEmployee(`Саша`, occupations.backend.name, {x: 3, y: 17}),
  new GetNewEmployee(`Руслан`, occupations.frontend.name, {x: 0, y: 19}),
  new GetNewEmployee(`Вадим`, occupations.frontend.name, {x: 0, y: 17}),
  new GetNewEmployee(`Женя`, occupations.qa.name, {x: 4, y: 19}),
]