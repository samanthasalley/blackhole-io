# stardust
Best grup best project.

testing!!!!!!!

#BuJo

## Server Routes

#### GET /api/todos

Output:
[
    "build stardust",
    "have a dance party"
]

#### GET /api/cal
Output:
[
  {
      "_id": 1,
      "month": 10,
      "day": 1,
      "events": ""
  },
  {
      "_id": 2,
      "month": 10,
      "day": 2,
      "events": ""
  },
  [...]
]

#### GET /api/space
Output:
{
  "_id": 1,
  "coord_x": [
      50,
      51
  ],
  "coord_y": [
      52,
      54
  ]
}

#### POST /api/space
Input Body: 
{
    coords_x = [1,2,3,4,5,...],
    coords_y = [1,2,3,4,5,...]
}

this post request will replace what is already in the database
