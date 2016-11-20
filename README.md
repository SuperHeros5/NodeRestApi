Adibatla Transportation busroute details API
============================================

This is a REST based API runs on node server and using this you can access the details of busroute numbers,timings and landmarks which comes to adibatla office.


Motivation
==========

I have been working with TCS for the past 3 years across different locations. Recently I have been moved to new TCS office(Adibatla Hyderabad) which is far away from the city where there is no public transportation. As of now TCS is providing free bus transportation connecting almost all the parts of the city, the details of the buses are shared to associates every week through mails in pdf format. It could be very difficult for the associates to go through that long pdf to find the bus details especially when they are in a hurry to catch the bus. I personally faced this situation.

So, we have come up with a web application where associates can search for busroute details in friendly manner on their favourite device from anywhere and at anytime.

"Never stop learning because life never stops teaching" -- unknown
Using this API you can access all the bus details.

Prerequisites
=============

-Latest node and npm should be installed in your PC
-Check the successful installation of node and npm by running node -v and npm -v in command prompt

Installation
============

-Clone this repo or download the zip file 
-Open the project and open command prompt from this location
-Run the command "npm install"
-It installs all the necessary dependencies
-Then run the command "npm start" which starts the server
-Test the server by hitting the url "http://localhost:8080/api" in the browser which should return a JSON message 
{ message: 'hooray! welcome to our api!' }
-That's it you are ready to test and experiment

Sample requests and responses
==============================

To access all the busstops covered
----------------------------------
GET request---http://localhost:8080/api/toadibatla  (if run in local)
              https://nodeapi.herokuapp.com/api/toadibatla  (if hosted in heroku)
It returns data of all the busstops in json format
response:

To access buses details at a particular stop going towards office(Adibatla)
---------------------------------------------------------------------------
GET request---http://localhost:8080/api/toadibatla/<bussotp>  (if run in local)
              https://nodeapi.herokuapp.com/api/toadibatla/<bussotp>   (if hosted in heroku)

It returns data of all the buses passing through the requested <busstop> 
response:

To access buses details at a particular stop going from office(Adibatla)
-------------------------------------------------------------------------- -
GET request---http://localhost:8080/api/fromadibatla/<bussotp>   (if run in local)
              https://nodeapi.herokuapp.com/api/fromadibatla/<bussotp>   (if hosted in heroku)
It returns data of all the buses passing through the requested <busstop> 
response:

Contributors
============

If you face any issues or any improvements you can raise an issue. Someone in our team responds to it as quickly as possible.

                                              Good luck and happy coding.


