import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header/Header';
import Disclaimer from './components/Disclaimer/Disclaimer';
import CapitalGainsCard from './components/CapitalGainsCard/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable/HoldingsTable';
import Loader from './components/Loader/Loader';
import { fetchHoldings, fetchCapitalGains } from './api/mockData';
import './App.css';

export default function App() {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [holdingsRes, gainsRes] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsRes);
        setCapitalGains(gainsRes.capitalGains);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleToggle = useCallback(
    (index) => {
      setSelectedIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    []
  );

  const handleToggleAll = useCallback(() => {
    setSelectedIndices((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((_, i) => i));
    });
  }, [holdings.length]);

  // Compute "After Harvesting" gains
  const afterHarvestingGains = useMemo(() => {
    if (!capitalGains) return null;

    let addedStcgProfits = 0;
    let addedStcgLosses = 0;
    let addedLtcgProfits = 0;
    let addedLtcgLosses = 0;

    for (const idx of selectedIndices) {
      const h = holdings[idx];
      if (!h) continue;

      // Short-term
      if (h.stcg.gain >= 0) {
        addedStcgProfits += h.stcg.gain;
      } else {
        addedStcgLosses += Math.abs(h.stcg.gain);
      }

      // Long-term
      if (h.ltcg.gain >= 0) {
        addedLtcgProfits += h.ltcg.gain;
      } else {
        addedLtcgLosses += Math.abs(h.ltcg.gain);
      }
    }

    return {
      stcg: {
        profits: capitalGains.stcg.profits + addedStcgProfits,
        losses: capitalGains.stcg.losses + addedStcgLosses,
      },
      ltcg: {
        profits: capitalGains.ltcg.profits + addedLtcgProfits,
        losses: capitalGains.ltcg.losses + addedLtcgLosses,
      },
    };
  }, [capitalGains, holdings, selectedIndices]);

  // Compute savings
  const savings = useMemo(() => {
    if (!capitalGains || !afterHarvestingGains) return 0;
    const preNet =
      capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses);
    const postNet =
      afterHarvestingGains.stcg.profits -
      afterHarvestingGains.stcg.losses +
      (afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses);
    // Savings = reduction in net gains (i.e., less tax)
    return Math.max(0, preNet - postNet);
  }, [capitalGains, afterHarvestingGains]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button className="error-retry" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="main__container">
          <div className="main__header">
            <h1 className="main__title">Tax Harvesting</h1>
            <div className="main__how-it-works-wrapper">
              <a href="#" className="main__how-it-works">How it works?</a>
              <div className="main__tooltip">
                <p>Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. <a href="#">Know More</a></p>
              </div>
            </div>
          </div>

          <Disclaimer />

          <div className="cg-cards">
            <CapitalGainsCard
              variant="pre"
              stcg={capitalGains.stcg}
              ltcg={capitalGains.ltcg}
            />
            <CapitalGainsCard
              variant="after"
              stcg={afterHarvestingGains.stcg}
              ltcg={afterHarvestingGains.ltcg}
              savings={savings}
            />
          </div>

          <HoldingsTable
            holdings={holdings}
            selectedIndices={selectedIndices}
            onToggle={handleToggle}
            onToggleAll={handleToggleAll}
          />
        </div>
      </main>
    </div>
  );
}
