Creating your Canvas Application on your External Site
Now that Canvas is enabled, you need to create the web app to load.  Below are the instructions for creating a Heroku app, but you can choose to create your app locally, or load t on any web server you choose (note that the URL to the app must use HTTPS unless the domain is localhost).  You can also choose to spin up a Heroku App using the Heroku Quick Start from the Canvas App Previewer and then replacing the contents with the attached zip file:
1.	Make sure the Heroku Toolbelt is installed in your org - https://toolbelt.heroku.com/
2.	Create a new app from the command line by typing: heroku create <app_name>
3.	Once the empty app is created, change to the directory you want the app in and clone the empty app to your machine with: heroku git:clone <app_name>
1.	This will create the directory <app_name> and set up the git remote
4.	Download the attached canvas-publisher-feed.zip file and unzip it into your new directory
1.	You need to make an edit to ../webapp/scripts/itinerary/js line 215 so that it points to your heroku app
5.	Change to the <app_name> directory
6.	Add the new files to the repo with: git add -A
7.	Commit the changes with: git commit -m "First App Push"
8.	Push the changes to Heroku with: git push heroku master
If there are no errors on the push, your app will now be available at http://<app_name>.herokuapp.com/.  Loading that URL should bring up a page like:
 
You should now be ready to create the Canvas App definition in your org.  

Creating your Canvas Application in your Org
You now need to create the Canvas App definition in your org.  This involves setting the metadata, specifying the locations, adding a Canvas Quick Action, and adding the Quick Action to your Publisher Layout(s).  From your Org
1.	Navigate to Setup >> Build >> Create >> Apps and click "New" in the Connected Apps related list
1.	Force.com Canvas is a module on a Connected App, so you create the app definition in the Connected App setup page
2.	Fill out the required Basic Information
1.	Connected App Name, Connected App API Name, Contact Email
3.	Check "Enable OAuth Settings" and fill out the required fields:
1.	"Callback URL" can be any URL (Signed Request does not use the callback)
2.	"Use Digital Signatures" should be unchecked
3.	"Selected OAuth Scopes" will define what your app can do inside of salesforce.  You can choose any you want for this app, but "Full Access" is the easiest
4.	In Canvas App Settings check "Force.com Canvas" to expand the Canvas options and fill out the fields:
1.	"Canvas App URL" should be the URL to your app - https://<app_name>.herokuapp.com/canvas.jsp
2.	"Access Method" should be "Signed Request (POST)"
3.	"Locations" should be "Publisher" and "Chatter Feed'
4.	Check "Create Actions Automatically" to automatically create the Quick Action (if you do not do this, you will have to create your own Canvas Quick Action)
5.	Click "Save" to save your app
6.	Navigate to Setup >> Administer >> Manage Apps >> Connected Apps
7.	Click on your app name
8.	Click Edit on your app
9.	Set the "Permitted Users" to "Admin approved users are pre-authorized" and click "Save"
10.	Scroll down to the Profiles and Permission Set related list
11.	Make sure your user has access (the easiest is to add all of the profiles to the app)
12.	Navigate to Setup >> Build >> Develop >> Static Resources and click "New"
13.	Set the name to be "airplane" and choose the file from your app directory on your machine (../webapp/images/airplane.png)
14.	Set the Caching to be "Public" and click "Save"
15.	Navigate to Setup >> Build >> Create >> Global Actions and click "Edit" next to the action with the same name as your Canvas App
16.	Set the Height to be 225px and click "Save"
17.	Click "Change Icon" and select the "airplane" static resource created in step 7
18.	Navigate to Setup >> Build >> Customize >> Chatter >> Publisher Layouts
1.	If this is not available, you may have to enable the publisher layouts under Setup >> Build >> Customize >> Chatter >> Settings >> Publisher Layouts >> Enable Publisher Actions
19.	Click "Edit" next to your Global Layout
20.	Drag your canvas app from actions down to the global publisher list below (in the example below "CanvasTest", was dragged from Actions)
 
21.	Add a variable to your Heroku App so that it can verify the Signed Request
1.	Navigate to Setup >> Build >> Create >> Apps and click your app name in the Connected Apps related list
2.	In the “API (Enable OAuth Settings)” section, click the “Click to reveal” link next to the Consumer Secret
3.	Copy the secret that is revealed
4.	In your command line (still inside your app directory) type heroku config:add CANVAS_CONSUMER_SECRET=<secret>
22.	Your app will now be in the Publisher and ready to create Canvas Feed Items

Working with your Canvas App in the Publisher and Chatter Feed
Now that your app is in the Publisher, you can use it to post about a set of itineraries (which are pre-loaded into the app).  You can access the app by going to the Chatter Tab (or to any page with a publisher) and clicking on your app in the Publisher:

 

As soon as you select an itinerary, the Chatter "Share" button will be enabled.  This is because of the publisher.* actions being called from the app (see ../webapp/scripts/itinerary.js lines 230 - 247).  You can also choose what type of Feed Item you would like to create.  We currently support 3 types:
1.	Text Post - This is the standard text type of post.  The TextPost payload must contain:
1.	p.feedItemType = "TextPost"
2.	p.auxText - The text that you want to post.  We concatenate this text with whatever the user enters into the "What are you working on" field.  There must be some text provided (either by the user in the text box, or by your app) or there will be an error
2.	Link Post - This is the standard link type of post.  The LinkPost payload must contain:
1.	p.feedItemType = "LinkPost"
2.	p.auxText - This is the text that appears over the link box in the feed item
3.	p.url - This is the URL the link will direct to
4.	p.urlName - This is the friendly name that appears over the URL in the link box
3.	Canvas Post - This is a new feed item type that will create a feed item that can load a Canvas App directly in the feed.  The CanvasPost must contain:
1.	p.feedItemType = "CanvasPost"
2.	p.auxText - This is the text that appears over the canvas box in the feed item
3.	p.namespace - The namespace of your Canvas App (if set)
4.	p.developerName - The API name of your Canvas App
5.	p.thumbnailUrl - An HTTPS URL to an icon you would like to display next to the app.  If none is provided, the default canvas puzzle icon will be used
6.	p.parameters - A JSON string of custom parameters you would like to send to the app.  This is an optional value that will be sent in the Signed Request as the "parameters" object
7.	p.title - The linked title that will display in the Canvas box in the feed item.  When clicked, this initiates the Canvas App load
8.	p.description - A 255 character description that will appear under the link title
If you select "Text Post" a feed item with the details of your itinerary will be posted:

 

If you select "Link Post" a feed item linking to your Heroku app will be posted.  Clicking the link will open the itinerary approval in Heroku:

 

If you select "Approval Post" a feed item with a Canvas App will be posted:

 

If you click on the link ("Itinerary - Release Planning at HQ" in the above image) the Canvas app will be opened and you will see content from your app:

 

Clicking the link again will close the Canvas App.

Creating your Canvas Feed Items
There are two ways to get a Canvas App into the feed.  Above demonstrates creating the app from the Publisher.  You can also create the Canvas Feed Item directly from the Connect API.  The field requirements are the same, but the format would be slightly different.  For instance, to create the above Canvas Feed Item through the Connect API you would:
•	POST to the feed resource you want, like https://<instance>.salesforce.com/services/data/v29.0/chatter/feeds/news/<userId>/feed-items
•	The Message would look like:
{
    "body" : {
      "messageSegments" : [ {
        "type" : "Text",
        "text" : "Please Approve my trip: Release Planning at HQ"
      } ]
    },
    "attachment" : {
      "description" : "This is a travel itinerary for Itinerary - Release Planning at HQ. Click the link to open the Canvas App.",
      "parameters" : "{&quot;itinerary&quot;:&quot;123&quot;}",
      "title" : "Itinerary - Release Planning at HQ",
      "namespacePrefix" : "",
      "developerName" : "Itinerary_App",
      "height" : "100px",
      "thumbnailUrl" : "https://icons.iconarchive.com/icons/aha-soft/perfect-transport/48/Airplane-icon.png",
      "attachmentType" : "Canvas"
    }
}


