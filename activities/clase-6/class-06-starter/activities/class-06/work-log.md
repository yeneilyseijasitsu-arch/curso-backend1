# Class 06 work log

## Environment

What did I configure? R: .env para definir el DATABASE_URL y JWT_SECRET, database para colocar datos de prueba (seeder)
Which command confirmed that it worked? R: con el comando 'npm test'

## Request flow

Where does the request enter?
Where is authentication checked?
Where is authorization checked?
Where is PostgreSQL accessed?

## Bug fixed

What was happening?
What should happen?
Which file did I modify?
Which test protects the behavior?

## Feature implemented

What does GET /requests/:id/history do?
Who can use it?
How is the result ordered?

## Test explained

Choose one test.
What data does it prepare?
What action does it perform?
What does it check?
Which rule does it protect?

## AI assistance

What did AI help me understand?
What code did it help produce?
What did I verify myself?
What suggestion was incorrect or incomplete?

## Remaining doubt

What part do I still not understand?

## Now answer (in your work-log.md):

1. What is the NAME of the failing test? R: GET /requests/42 returns the request for its owner
2. What value did it EXPECT? R: 200
3. What value did it GET? R: 404 
4. In which FILE and LINE is the assertion? R: test at scripts/fixtures/reading-a-failure.test.js:12:1
5. Did the failure happen in Prepare, Act or Check? R: Check
6. Write ONE hypothesis before changing anything. R: