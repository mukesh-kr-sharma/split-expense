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
    try {
        const formData = await req.formData()
        var data = {
            name: formData.get('name'),
            description: formData.get('description'),
            is_public: formData.get('is_public') === 'true',
            created_by: formData.get('created_by')
        }
        if (data.created_by === '')
            data.created_by = null

        // return NextResponse.json(data, {status:200})
        const expense_group = await prisma.expense_group.create({ data: data });
        return NextResponse.json(expense_group, { status: 200, });
    } catch (error) {
        return NextResponse.json(
            { error: "Expense creation failed" },
            { status: 500, }
        );
    }
}