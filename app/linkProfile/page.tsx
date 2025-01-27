'use client';

import { client } from "@/config/Thirdweb";
import { PayEmbed, useLinkProfile, useProfiles, useUnlinkProfile } from "thirdweb/react";
import { base } from "thirdweb/chains";
import LinkProfile from "@/components/LinkProfile";

export default function Page() {
    const { data: profiles } = useProfiles({
        client,
    });
    const { mutate: unlinkProfile } = useUnlinkProfile();

    return (
        <>
            {profiles?.map((profile, index) => (
                <div key={profile.details.id} className="card p-4 my-4 rounded-lg shadow-lg border flex flex-row items-center justify-between min-w-96 md:max-w-xl">

                    <h3 className="text-xl ">{profile.type}</h3>

                    <div className="flex gap-2 flex-row">

                        {profile.type === "wallet" && (<ProfileField value={profile.details.address} />)}

                        {profile.type === "email" && (<ProfileField value={profile.details.emailVerified ? "Yes" : "No"} />)}

                        {["google", "apple", "x",  "facebook", "github"].includes(profile.type) && (
                            <div className=" flex justify-between flex-row">
                                {/* <ProfileField value={<img src={profile.details.picture} alt={`${profile.type} Profile`} className="rounded-full w-16 h-16" />} /> */}
                                <ProfileField value={profile.details.name} />
                            </div>
                        )}

                        {/* Common Fields */}
                        {profile.details.phone && <ProfileField value={profile.details.phone} />}
                    </div>

                    <div key={profile.details.id} className="btn btn-error"
                        onClick={() => {
                            unlinkProfile({
                                client,
                                profileToUnlink: profiles[index],
                            });
                        }}>
                        Unlink {profile.type}
                    </div>

                </div>
            ))}





            <LinkProfile />


        </>
    );
}


{/* 可复用的字段组件 */ }
function ProfileField({ value }: { value: React.ReactNode }) {
    return (
        <div className="flex ">
            <span>{value}</span>
        </div>
    );
}