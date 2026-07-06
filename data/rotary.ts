export interface RotaryMember {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export const ROTARY_DIRECTORY: readonly RotaryMember[] = [
  { name: "Rotary District Governor", role: "District Governor", phone: "+91 90000 20001", email: "governor@rotarydistrict3141.org" },
  { name: "Rotary Secretary", role: "District Secretary", phone: "+91 90000 20002", email: "secretary@rotarydistrict3141.org" },
  { name: "Rotary Treasurer", role: "District Treasurer", phone: "+91 90000 20003", email: "treasurer@rotarydistrict3141.org" },
  { name: "Ahmed Patel", role: "Club President", phone: "+91 90000 20004", email: "ahmed.patel@rotarydistrict3141.org" },
  { name: "Anita Mehra", role: "Club Secretary", phone: "+91 90000 20005", email: "anita.mehra@rotarydistrict3141.org" },
  { name: "Bhavesh Shah", role: "Club President", phone: "+91 90000 20006", email: "bhavesh.shah@rotarydistrict3141.org" },
  { name: "Kavita Joshi", role: "Club Secretary", phone: "+91 90000 20007", email: "kavita.joshi@rotarydistrict3141.org" },
  { name: "Mohan Rao", role: "Club Chair", phone: "+91 90000 20008", email: "mohan.rao@rotarydistrict3141.org" },
] as const;