import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams.get("expense_id");
    const transactions = await prisma.ExpenseTransaction.findMany({
        relationLoadStrategy: 'join',
        where: {
            expense_id: queryParam
        },
        include: {
            paid_by: {
                select: {
                    id: true,
                    name: true
                }
            },
            participants: {
                select: {
                    id: true,
                    name: true
                }
            },
        },
    })
    return NextResponse.json({ transactions: transactions }, { status: 200 });
}


export async function POST(req) {
    try {
        const body = await req.json();
        const txn = await prisma.ExpenseTransaction.create({
            data: {
                expense_id: body.expense_id,
                paid_for: body.paid_for,
                paid_by_user_id: body.paid_by.id,
                amount: body.amount,
                participants: { connect: body.participants }
            },
            include: {
                paid_by_user_id: false,
                paid_by: { select: { id: true, name: true } },
                participants: { select: { id: true, name: true } },
            },
        });
        return NextResponse.json(txn, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create expense transaction" },
            { status: 500, }
        );
    }
}


export async function DELETE(req) {
    try {
        const body = await req.json();
        const deleteExpenseTxn = await prisma.ExpenseTransaction.delete({
            where: {
                id: body.id,
            },
        })
        return NextResponse.json(deleteExpenseTxn, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete expense transaction" },
            { status: 500, }
        );
    }
}