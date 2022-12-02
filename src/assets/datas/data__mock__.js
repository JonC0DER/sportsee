const USER_MAIN_DATA = [
    {
        id: 42,
        userInfos: {
            firstName: 'John',
            lastName: 'CODER',
            age: 37,
        },
        todayScore: 0.18,
        keyData: {
            calorieCount: 2930,
            proteinCount: 365,
            carbohydrateCount: 290,
            lipidCount: 50
        }
    }
]

const USER_ACTIVITY = [
    {
        userId: 42,
        sessions: [
            {
                day: '2020-07-01',
                kilogram: 70,
                calories: 120
            },
            {
                day: '2020-07-02',
                kilogram: 70,
                calories: 110
            },
            {
                day: '2020-07-03',
                kilogram: 71,
                calories: 118
            },
            {
                day: '2020-07-04',
                kilogram: 71,
                calories: 142
            },
            {
                day: '2020-07-05',
                kilogram: 70,
                calories: 90
            },
            {
                day: '2020-07-06',
                kilogram: 68,
                calories: 92
            },
            {
                day: '2020-07-07',
                kilogram: 66,
                calories: 210
            }
        ]
    }
]

const USER_AVERAGE_SESSIONS = [
    {
        userId: 42,
        sessions: [
            {
                day: 1,
                sessionLength: 30
            },
            {
                day: 2,
                sessionLength: 23
            },
            {
                day: 3,
                sessionLength: 45
            },
            {
                day: 4,
                sessionLength: 50
            },
            {
                day: 5,
                sessionLength: 0
            },
            {
                day: 6,
                sessionLength: 0
            },
            {
                day: 7,
                sessionLength: 60
            }
        ]
    }
]


const USER_PERFORMANCE = [
    {
        userId: 42,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            {
                value: 180,
                kind: 1
            },
            {
                value: 620,
                kind: 2
            },
            {
                value: 440,
                kind: 3
            },
            {
                value: 250,
                kind: 4
            },
            {
                value: 950,
                kind: 5
            },
            {
                value: 290,
                kind: 6
            }
        ]
    }
]

module.exports = {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE
}