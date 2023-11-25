export function getRole(role: string): string | null {
    switch (role) {
        case "USR":
            return "Users";
        case "ADM":
            return "Admin";
        case "PJG":
            return "Penjaga";
        default:
            return null;
    }
}
