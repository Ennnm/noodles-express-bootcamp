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

const handleYieldReq = (req, res) =>{
  read('data.json', (err, content)=>{
    const yieldReq = Number(req.params.yield);
    if(Number.isNaN(yieldReq))
    {
      res.status(404).send('Sorry, that is not a number!');
    }
    else{
      const recipes = content.recipes;
      const recipeYield = recipes.filter(recipe => recipe.yield === yieldReq);
      res.send(recipeYield);
    }
  })
}



app.get('/recipe/:index', handleRecipes);
app.get('/yield/:yield', handleYieldReq)
app.listen(3004);