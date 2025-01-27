'use client'

import { client } from "@/config/Thirdweb";
import { useState } from "react";
import { base } from "thirdweb/chains";
import { useLinkProfile, useProfiles, useUnlinkProfile } from "thirdweb/react";
import { createWallet, preAuthenticate } from "thirdweb/wallets";

export default function LinkProfile() {
    const { mutate: linkProfile, isPending, error } = useLinkProfile();
    const [email, setEmail] = useState(""); // 用户输入的邮箱
    const [verificationCode, setVerificationCode] = useState(""); // 验证码

    const linkGoogle = () => {
        linkProfile({
            client,
            strategy: "google",
        });
    };

    const linkApple = () => {
        linkProfile({
            client,
            strategy: "apple",
        });
    };
    const linkX = () => {
        linkProfile({
            client,
            strategy: "x",
        });
    };
    const linkFacebook = () => {
        linkProfile({
            client,
            strategy: "facebook",
        });
    };
    const linkGithub = () => {
        linkProfile({
            client,
            strategy: "github",
        });
    };
    const linkMetamask = () => {
        linkProfile({
            client,
            strategy: "wallet",
            wallet: createWallet("io.metamask"),
            chain: base,
        });
    };

    const sendEmail = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            await preAuthenticate({
                client,
                strategy: "email",
                email,
            });
            alert("Verification email sent! Please check your inbox.");
        } catch (err) {
            console.error("Error sending email:", err);
            alert("Failed to send verification email.");
        }
    };

    const linkEmail = () => {
        if (!email || !verificationCode) {
            alert("Please enter both your email and verification code.");
            return;
        }

        linkProfile({
            client,
            strategy: "email",
            email,
            verificationCode,
        });
    };


    return (
        <div className="p-4">


            <button onClick={linkGoogle} className="btn btn-primary my-2 "> Link Google </button>
            <button onClick={linkApple} className="btn btn-primary my-2">Link Apple</button>
            <button onClick={linkX} className="btn btn-primary my-2">Link X</button>
            <button onClick={linkFacebook} className="btn btn-primary my-2">Link Facebook</button>
            <button onClick={linkGithub} className="btn btn-primary my-2">Link Github</button>
            <button onClick={linkMetamask} className="btn btn-primary my-2">Link Metamask</button>
         

            <div className="my-2 flex flex-ro">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-64 mb-2"
                />
                <button onClick={sendEmail} className="btn btn-secondary mb-2">
                    Send Code
                </button>
            </div>

            <div className="my-2 flex flex-row">
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input input-bordered w-64 mb-2"
                />
                <button onClick={linkEmail} className="btn btn-primary">Verify Code</button>
            </div>


            {isPending && <p>Linking in progress...</p>}
            {error && <p className="text-error">Error: {error.message}</p>}


        </div>
    );
}