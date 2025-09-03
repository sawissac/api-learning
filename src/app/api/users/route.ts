import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const amountMultiplyBy = searchParams.get("amountMultiplyBy");

    const p = Math.max(0, Number(page || 0) - 1);
    const l = Math.max(1, Number(limit || 1));

    const from = p * l;
    const to = from - 1 + l;

    const supabase = await createClient();
    const query = supabase.schema("public").rpc("multiply_users_amount", {
      multiplier: Number(amountMultiplyBy || 1),
    });

    // const query = supabase.schema("public").from("users").select("*");

    if (id) {
      query.eq("id", Number(id));
    }

    if (search) {
      query.ilike("name", `%${search}%`);
    }

    query.range(from, to);

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    let result = data;

    // if (amountMultiplyBy) {
    //   result = data.map((user) => {
    //     return {
    //       ...user,
    //       amount: (user.amount ?? 0) * Number(amountMultiplyBy),
    //     };
    //   });
    // }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : error instanceof PostgrestError
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, amount, gender, phone } = body;

    if (!name || !amount || !gender || !phone) {
      throw new Error("Missing required fields");
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("public")
      .from("users")
      .insert({
        name,
        amount,
        gender,
        phone,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : error instanceof PostgrestError
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const body = await request.json();
    const { name, amount, gender, phone } = body;

    if (!id || !name || !amount || !gender || !phone) {
      throw new Error("Missing required fields");
    }

    const supabase = await createClient();
    const { error } = await supabase
      .schema("public")
      .from("users")
      .update({
        name,
        amount,
        gender,
        phone,
      })
      .eq("id", Number(id));

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : error instanceof PostgrestError
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      throw new Error("Missing required fields");
    }

    const supabase = await createClient();
    const { error } = await supabase
      .schema("public")
      .from("users")
      .delete()
      .eq("id", Number(id));

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : error instanceof PostgrestError
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
