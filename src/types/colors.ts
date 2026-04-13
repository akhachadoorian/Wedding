export type GoldScale = 
  | "--gold-100" | "--gold-200" | "--gold-250" | "--gold-300" 
  | "--gold-400" | "--gold-500" | "--gold-600" | "--gold-700" 
  | "--gold-800" | "--gold-850" | "--gold-900" | "--gold-1000"

export type CreamScale = 
  | "--cream-100" | "--cream-300" | "--cream-500" 
  | "--cream-700" | "--cream-900"

export type GrayScale = 
  | "--gray-300" | "--gray-500" | "--gray-700" | "--gray-900"

export type BlackScale = 
  | "--black-800" | "--black-850" | "--black-900" 
  | "--black-950" | "--black-1000"

export type ColorVariables = GoldScale | CreamScale | GrayScale | BlackScale