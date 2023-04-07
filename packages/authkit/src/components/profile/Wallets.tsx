import { Wallet, WalletChainType } from "@us3r-network/profile";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { shortPubKey } from "../../utils";
import CopyIcon from "./CopyIcon";
import PlusIcon from "./PlusIcon";
import TrashIcon from "./TrashIcon";
import WalletEditModal from "./WalletsModal";

export default function Wallets({
  wallets,
  updateWallets,
}: {
  wallets: Wallet[];
  updateWallets: (wallets: Wallet[]) => Promise<void>;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <WalletsContainer>
      <div className="title">
        <h3>Wallets({wallets.length})</h3>
        <span onClick={() => setEdit(true)}>
          <PlusIcon />
        </span>
      </div>
      <div className="wallet-list">
        {wallets.map((item, index) => {
          return (
            <div key={item.address} className="wallet-item">
              <div>
                <span>{shortPubKey(item.address)}</span>{" "}
                {item.primary && <span className="badge">Main</span>}
              </div>
              <div>
                {!item.primary && (
                  <span
                    onClick={async () => {
                      await updateWallets([
                        ...wallets.slice(0, index),
                        ...wallets.slice(index + 1),
                      ]);
                    }}
                  >
                    <TrashIcon />
                  </span>
                )}
                <Copy address={item.address} />
              </div>
            </div>
          );
        })}
      </div>

      <WalletEditModal
        open={edit}
        onClose={() => setEdit(false)}
        updateWallet={async (wallet) => {
          const data = [
            ...wallets,
            {
              address: wallet,
              chain: "EVM" as WalletChainType,
              primary: false,
            },
          ];
          await updateWallets(data);
        }}
      />
    </WalletsContainer>
  );
}

function Copy({ address }: { address: string }) {
  const [showTint, setShowTint] = useState(false);
  const showTintAction = useCallback(() => {
    setShowTint(true);
    setTimeout(() => {
      setShowTint(false);
    }, 3000);
  }, []);
  return (
    <CopyBox>
      <span
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(address);
            showTintAction();
          } catch (error) {
            console.log("Copied Fail");
          }
        }}
      >
        <CopyIcon />
      </span>
      {showTint && <span className="tint">Copied</span>}
    </CopyBox>
  );
}

const CopyBox = styled.div`
  position: relative;
  .tint {
    position: absolute;
    bottom: -30px;
    left: -20px;
    background: #1b1e23;
    border: solid 1px gray;
    border-radius: 5px;
    padding: 5px;
    z-index: 100;
  }
`;

const WalletsContainer = styled.div`
  padding: 20px;
  gap: 20px;
  width: 360px;
  box-sizing: border-box;
  background: #1b1e23;
  border-radius: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h3 {
      margin: 0;
      font-style: italic;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      display: flex;
      color: #ffffff;
    }

    > span {
      cursor: pointer;
    }
  }

  .wallet-list {
    margin-top: 20px;
    color: #718096;
    .wallet-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
          cursor: pointer;
        }
      }

      .badge {
        padding: 2px 4px;
        gap: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        background: #718096;
        border-radius: 4px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;

        color: #14171a;
      }
    }
  }
`;
