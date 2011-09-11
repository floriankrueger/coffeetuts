# Nodetuts Episode 18 #

## MongoDB and Mongoose ##

Since the API of Mongoose changed significantly since the release of this episode, there are a few changes in code. I changed the 'all' method of the products model to be a static method like the authenticate method on the users model to separate the model from the controller a bit more. However I did not do this to the other CRUD operations to not change the code completely.

What I discovered is, that you don't seem to need the `product._id.toHexString()` anymore as everything already worked for me when in the screencast Pedro needed to change the original `product.id` calls. To make it more compliant I changed it anyways.