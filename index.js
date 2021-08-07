import express from "express";
import { read } from './jsonFileStorage.mjs'

const app = express();

const handleRecipes = (req, res)=> 
{
  read('data.json', (err, content)=>{
    const recipeIdx = req.params.index;
     if( recipeIdx < 0 || recipeIdx >= content.recipes.length)
     {
       res.status(404).send('Sorry, we cannot find that!');
     }
     else{
        const recipe = content.recipes[recipeIdx];
        res.send(recipe);
     }

  })
}



app.get('/recipe/:index', handleRecipes);
app.listen(3004);