export default async function userRegister(userName: string, userEmail: string, userPassword: string, userTelephone: string, userRole: string = "user") {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
            telephone: userTelephone,
            role: userRole,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    return await response.json();
}
