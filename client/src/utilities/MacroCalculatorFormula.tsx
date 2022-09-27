import { Profile, Activity, Goal } from "../interfaces/index";

export const calorieIntake = (profile: Profile) : number => {
  let BMR;

  if (!profile.gender) {
    BMR = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5; //male
  } else {
    BMR = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }

  if (profile.activity === Activity.SEDENTARY) {
    BMR *= 1.2;
  } else if (profile.activity === Activity.MODERATE) {
    BMR *= 1.55;
  } else {
    BMR *= 1.725;
  }

  if (profile.goal === Goal.LOSE) {
    BMR -= 250; // 250kcal to lose 0.25kg/week
  } else if (profile.goal === Goal.GAIN) {
    BMR += 250;
  }

  return Math.floor(BMR);
};

export const proteinIntake = (profile: Profile)  : number => {
  let proteins;

  if (profile.activity === Activity.SEDENTARY) {
    proteins = 0.8 * profile.weight;
  } else if (profile.activity === Activity.MODERATE) {
    proteins = 1.5 * profile.weight;
  } else {
    proteins = 2 * profile.weight;
  }
  return Math.floor(proteins);
};

export const carbsIntake = (profile: Profile) : number => {
  return Math.floor(0.4 * calorieIntake(profile) / 4);
};

export const fatIntake = (profile: Profile) : number => {
  return Math.floor(0.35 * calorieIntake(profile) / 4);
};

export const sugarIntake = (profile: Profile) : number => { //American Heart Association (AHA)
  return Math.floor(!profile.gender ? 35.5 : 25);
}
