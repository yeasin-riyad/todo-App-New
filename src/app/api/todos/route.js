// app/api/todos/route.js

import { connectToDatabase } from '@/database/db';
import { NextResponse } from 'next/server';

let todosCollection;

async function initializeTodosCollection() {
    if (!todosCollection) {
        todosCollection = await connectToDatabase();
    }
}

// Define the POST request handler
export async function POST(request) {
    await initializeTodosCollection(); // Ensure collection is initialized
    try {
        // Parse the request body
        const body = await request.json();

        // Create a new todo item
        const newTodo = {
            todo: body.todo,
            email: body.email,
            createdAt: new Date(), // Set the creation date
        };

        // Insert the new todo into the collection
        const result = await todosCollection.insertOne(newTodo);

        // Return a success response with the inserted document ID
        return NextResponse.json(
            {
                message: 'Todo added successfully',
                todo: {
                    _id: result.insertedId.toString(), // Convert ObjectId to string
                    ...newTodo,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error inserting todo:', error);
        return NextResponse.json(
            {
                message: 'Failed to add todo',
                error: error.message, // Use error message directly
            },
            { status: 500 }
        );
    }
}
