import {Request,Response} from 'express';
import pool from '../database';
class GamesController {

    public async index(req:Request,res:Response){
        await pool.query('SELECT * FROM games', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }
    
    public async create(req:Request,res:Response):Promise<void>{
        await pool.query('INSERT INTO games set ?',[req.body]);
        res.json({message:'create a game'});
    }
    public async getOne(req:Request,res:Response):Promise<void>{
        const { id } = req.params;
       const games=await pool.query(`SELECT * FROM games  WHERE id='${id}'`,function(err,result,fields){
           if(err) throw err;
           res.json(result);
       });
     
      

    }

    public async delete(req:Request,res:Response):Promise<void>{
        const { id } = req.params;
       await  pool.query('DELETE FROM games WHERE id=?',[id]);
        res.json({message:'El juego fue eliminado'});
    }
    public async  update(req:Request,res:Response):Promise<void>{
        const { id } =req.params;
        await pool.query('UPDATE games set ? WHERE id=?',[req.body,id]);
        res.json({message:'El juego fue actualizado'});
    }
}

export const gamesController=new GamesController();