import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams.get("expense_id");
    const users = await prisma.ExpenseUser.findMany({
        where: {
            expense_id: queryParam
        }
    })
    return NextResponse.json({ users: users }, { status: 200 });
}


export async function POST(req) {
    try {
        const body = await req.json();
        const user = await prisma.ExpenseUser.create({data: body});
        return NextResponse.json(user, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500, }
        );
    }
}


export async function DELETE(req) {
    try {
        const body = await req.json();
        const deleteUser = await prisma.ExpenseUser.delete({
            where: {
              id: body.id,
            },
          })
        return NextResponse.json(deleteUser, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500, }
        );
    }
}