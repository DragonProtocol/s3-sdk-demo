import { Wallet } from "@us3r-network/profile";
import { useState } from "react";
import { shortPubKey } from "../../utils";

export default function Wallets({
  editing = false,
  wallets,
  updateWallets,
}: {
  editing?: boolean;
  wallets: Wallet[];
  updateWallets: (wallets: Wallet[]) => void;
}) {
  const [tempWallet, setTempWallet] = useState("");
  return (
    <div>
      <h3>wallets</h3>
      {wallets.map((item, index) => {
        return (
          <div key={item.address}>
            <span>{shortPubKey(item.address)}</span>{" "}
            {(item.primary && <span>main</span>) ||
              (editing && (
                <button
                  onClick={() => {
                    updateWallets([
                      ...wallets.slice(0, index),
                      ...wallets.slice(index + 1),
                    ]);
                  }}
                >
                  remove
                </button>
              ))}
          </div>
        );
      })}
      {editing && (
        <div>
          <input
            type="text"
            value={tempWallet}
            onChange={(e) => {
              setTempWallet(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setTempWallet("");
              updateWallets([
                ...wallets,
                {
                  address: tempWallet,
                  primary: false,
                  chain: "EVM",
                },
              ]);
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
