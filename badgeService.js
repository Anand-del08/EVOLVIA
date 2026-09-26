// const BADGES=[
//     {
//         id:"beginner",
//         name:"Beginner",
//         description:"Earn 5000 XP",
//         requiredXP:5000
//     },
//     {
//         id:"coder",
//         name:"Coder",
//         description:"Earn 10000 XP",
//         requiredXP:10000
//     },
//     {
//         id:"rising-coder",
//         name:"Rising Coder",
//         description:"Earn 25000 XP",
//         requiredXP:25000
//     },
//     {
//         id:"skilled-coder",
//         name:"Skilled Coder",
//         description:"Earn 50000 XP",
//         requiredXP:50000
//     },
//     {
//         id:"advanced-coder",
//         name:"Advanced Coder",
//         description:"Earn 50000 XP",
//         requiredXP:100000
//     },
//     {
//         id:"expert-coder",
//         name:"Expert Coder",
//         description:"Earn 250000 XP",
//         requiredXP:250000
//     },
//     {
//         id:"elite-coder",
//         name:"Elite Coder",
//         description:"Earn 500000 XP",
//         requiredXP:"500000"
//     },
//     {
//         id:"master-coder",
//         name:"Master Coder",
//         description:"Earn 1000000 XP",
//         requiredXP:1000000
//     }
// ];


// module.exports=BADGES;





const BADGES=require("../constants/badges");

//================================
//CHECK SPECIAL BADGE CONDITIONS
//================================
function isSpecialBadgeUnlocked(badge,userGamification){
    //Error Solver
    if(badge.id==="error-solver"){
        return (
            userGamification.errorsSolved>=
                badge.requiredErrorsSolved &&

            userGamification.currentStreak>=
                badge.requiredStreakDays
        );
    }

    //Faster Coder
    if(badge.id==="faster-coder"){
        return(
            userGamification.timeChallengesCompleted>=
                badge.requiredTimeChallenges &&

            userGamification.currentStreak>=
                badge.requiredStreakDays    
        );
    }

    //Coding Master
    if(badge.id==="coding-master"){
        return(
            userGamification.challengesCompleted >=
                badge.requiredChallenges &&
            
            userGamification.currentStreak>=
                badge.requiredStreakDays    
        );
    }

    //Master Coder
    if(badge.id==="master-coder"){
        return(
            userGamification.totalXP >=
                badge.requiredXP &&

            userGamification.currentStreak >=
                badge.requiredStreakDays    
        );
    }

    return false;
}

    //===============================
    //GET UNLOCKED BADGES
    //===============================

    function getUnlockedBadges(userGamification){
        const unlockedBadges=[
            ...(userGamification.badges ||[])
        ];

        for(const badge of BADGES){
            const alreadyUnlocked=
                unlockedBadges.some(
                    (unlockedBadge)=>
                        unlockedBadge.id===badge.id
                );

            if(alreadyUnlocked){
                continue;
            }

            //============================
            //NORMAL XP BADGE
            //============================

            if (
                badge.requiredXP &&
                !badge.requiredStreakDays
            ){
                if(
                    userGamification.totalXP >=
                    badge.requiredXP
                ){
                    unlockedBadges.push({
                        id:badge.id,
                        name:badge.name,
                        description:badge.description
                    });
                }
                continue;
            }

            //==============================
            //SPECIAL BADGE
            //==============================

            if(
                badge.requiredStreakDays &&
                isSpecialBadgeUnlocked(
                    badge,
                    userGamification
                )
            ){
                unlockedBadges.push({
                    id:badge.id,
                    name:badge.name,
                    description:badge.description
                });
            }
        }
        return unlockedBadges;
    }

    //========================
    //UPDATE USER BADGES
    //========================

function updateBadges(userGamification){
    userGamification.badges=
        getUnlockedBadges(
            userGamification
        );
    return userGamification.badges;    
    
}

module.exports={
    getUnlockedBadges,
    updateBadges,
    isSpecialBadgeUnlocked
};