import clientsData from "../../data/clients.json";

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface ClientsContent {
  dataNote: string;
  eyebrow: string;
  title: string;
  description: string;
  logos: ClientLogo[];
}

const clients = clientsData as unknown as ClientsContent;

export function getClientsContent(): ClientsContent {
  return clients;
}