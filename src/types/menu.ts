export type MenuItem = {
id: number;
date: string; // yyyy-mm-dd
mealType: number; // 0 sabah, 1 akşam
cityId: number;
first?: string;
firstCalories?: string;
second?: string;
secondCalories?: string;
third?: string;
thirdCalories?: string;
fourth?: string;
fourthCalories?: string;
totalCalories?: number;
};