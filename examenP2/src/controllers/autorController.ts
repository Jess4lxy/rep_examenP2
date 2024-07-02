import { Request, Response } from 'express';
import { agregarAutor, obtenerAutores, buscarAutor, actualizarAutor, eliminarAutor } from '../db';
import { Autor } from '../models/Autor';

export async function agregarAutorController(req: Request, res: Response): Promise<void> {
    const { nombre, apellido, fechaNacimiento } = req.body;

    const autor: Autor = {
        nombre,
        apellido,
        fechaNacimiento
    };

    try {
        await agregarAutor(autor);

        res.status(201).json({ message: 'Autor agregado correctamente' });
    } catch (error) {
        console.error('Error al dar de alta el autor:', (error as Error).message);
        res.status(500).json({ error: 'Error al dar de alta el autor' });
    }
}

export async function obtenerAutoresController(req: Request, res: Response): Promise<void> {
    try {
        const autores: Autor[] = await obtenerAutores();
        res.status(200).json(autores);
    } catch (error) {
        console.error('Error al obtener todos los autores:', (error as Error).message);
        res.status(500).json({ error: 'Error al obtener todos los autores' });
    }
}

export async function buscarAutorController(req: Request, res: Response): Promise<void> {
    const idOrNombre: string = req.params.idOrNombre;

    try {
        const autor: Autor | null = await buscarAutor(idOrNombre);

        if (autor) {
            res.status(200).json(autor);
        } else {
            res.status(404).json({ message: `Autor con ID o nombre '${idOrNombre}' no encontrado` });
        }
    } catch (error) {
        console.error('Error al buscar el autor por ID o nombre:', (error as Error).message);
        res.status(500).json({ error: 'Error al buscar el autor por ID o nombre' });
    }
}

export async function actualizarAutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    const { nombre, apellido, fechaNacimiento } = req.body;

    const autor: Autor = {
        nombre,
        apellido,
        fechaNacimiento
    };

    try {
        await actualizarAutor(id, autor);

        res.status(200).json({ message: `Autor con ID ${id} actualizado correctamente` });
    } catch (error) {
        console.error(`Error al actualizar el autor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al actualizar el autor con ID ${id}` });
    }
}

export async function eliminarAutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);

    try {
        await eliminarAutor(id);

        res.status(200).json({ message: `Autor con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error(`Error al eliminar el autor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al eliminar el autor con ID ${id}` });
    }
}
