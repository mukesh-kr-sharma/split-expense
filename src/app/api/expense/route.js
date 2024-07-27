import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams.get("expense_id");
    const data = await prisma.Expense.findUnique({
        where: {
            id: queryParam
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true
                }
            },
            transactions: {
                select: {
                    id: true,
                    paid_for: true,
                    amount: true,
                    participants: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    paid_by: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
            },
        },
    })
    return NextResponse.json({ expense: data }, { status: 200 });
}


export async function POST(req) {
    console.log("function called")
    try {
        const expense = await prisma.Expense.create({ data: {} });
        return NextResponse.json(expense, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Expense creation failed" },
            { status: 500, }
        );
    }
}