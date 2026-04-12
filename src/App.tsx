/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { Upload, Printer, User, CreditCard, Calendar, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GOLD = '#B8963E';

const MaestroLogo = ({ className = 'w-8 h-8', invert = false }: { className?: string; invert?: boolean }) => (
  <img
    src="https://cms.maestro.org/api/media/file/maestro-university%20(1).png"
    alt="Maestro University"
    className={className}
    style={{ objectFit: 'contain', filter: invert ? 'invert(1)' : 'none' }}
  />
);

// ─── Reusable label+value pair ────────────────────────────────────────────────
const Field = ({
  label,
  value,
  mono = false,
  dark = false,
  align = 'left',
  accentValue = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  dark?: boolean;
  align?: 'left' | 'right' | 'center';
  accentValue?: boolean;
}) => (
  <div style={{ textAlign: align }}>
    <div
      style={{
        fontSize: '0.36rem',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        lineHeight: 1,
        marginBottom: '0.12rem',
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: mono ? "'Courier New', Courier, monospace" : 'inherit',
        fontSize: mono ? '0.72rem' : '0.52rem',
        fontWeight: mono ? 900 : 700,
        letterSpacing: mono ? '0.08em' : '0.02em',
        color: accentValue ? GOLD : dark ? '#FFFFFF' : '#111111',
        lineHeight: 1.15,
      }}
    >
      {value}
    </div>
  </div>
);

// ─── Divider ────────────────────────────────────────────────────────────────
const Divider = ({ dark }: { dark: boolean }) => (
  <div
    style={{
      height: '1px',
      backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      width: '100%',
    }}
  />
);

// ─── VERTICAL FRONT ─────────────────────────────────────────────────────────
const VerticalFront = ({
  dark,
  firstName,
  lastName,
  major,
  studentId,
  issueDate,
  expiryDate,
  photoUrl,
}: {
  dark: boolean;
  firstName: string;
  lastName: string;
  major: string;
  studentId: string;
  issueDate: string;
  expiryDate: string;
  photoUrl: string | null;
}) => {
  const fmt = (d: string) =>
    d
      ? new Date(d).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
      : '--/--/----';

  return (
    <div
      className={`id-card-vertical flex flex-col ${dark ? 'card-dark security-bg-dark' : 'card-light security-bg'}`}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Header band ── */}
      <div
        style={{
          background: dark
            ? `linear-gradient(135deg, #000000 0%, #1a1a1a 100%)`
            : `linear-gradient(135deg, #111111 0%, #2a2a2a 100%)`,
          padding: '0.18in 0.2in 0.14in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: 'uppercase',
            }}
          >
            Maestro
          </div>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 900,
              color: GOLD,
              letterSpacing: '-0.01em',
              lineHeight: 1,
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: 'uppercase',
            }}
          >
            University
          </div>
          <div
            style={{
              fontSize: '0.3rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.2em',
              marginTop: '0.04in',
              textTransform: 'uppercase',
            }}
          >
            Student Identification
          </div>
        </div>
        <MaestroLogo className="w-10 h-10 shrink-0" />
      </div>

      {/* ── Photo ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0.16in 0.2in 0.12in',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '1.05in',
            height: '1.3in',
            borderRadius: '0.04in',
            overflow: 'hidden',
            border: dark ? `1px solid rgba(255,255,255,0.1)` : `1px solid rgba(0,0,0,0.1)`,
            background: dark ? '#1c1c1c' : '#f3f3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User size={44} color={dark ? '#333' : '#ccc'} />
          )}
        </div>
      </div>

      {/* ── Name + Program ── */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 0.2in',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: dark ? '#FFFFFF' : '#111111',
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {firstName} {lastName}
        </div>
        <div
          style={{
            fontSize: '0.38rem',
            fontWeight: 600,
            color: GOLD,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: '0.06in',
          }}
        >
          {major}
        </div>
      </div>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Data rows ── */}
      <div
        style={{
          padding: '0.12in 0.2in 0.15in',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.1in',
          flexShrink: 0,
        }}
      >
        <Divider dark={dark} />
        {/* Student ID — full width */}
        <div
          style={{
            background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
            borderRadius: '0.03in',
            padding: '0.07in 0.1in',
          }}
        >
          <div
            style={{
              fontSize: '0.3rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              marginBottom: '0.04in',
            }}
          >
            Student ID Number
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.78rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: dark ? '#FFFFFF' : '#111111',
            }}
          >
            {studentId || 'MS-00-00000000'}
          </div>
        </div>

        {/* Issued + Expires — side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Field label="Date Issued" value={fmt(issueDate)} dark={dark} />
          <Field label="Expiration" value={fmt(expiryDate)} dark={dark} align="right" accentValue={false} />
        </div>

        <Divider dark={dark} />

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '0.3rem', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            maestrocollege.edu
          </div>
          <div
            style={{
              width: '0.18in',
              height: '0.18in',
              borderRadius: '50%',
              background: GOLD,
              opacity: 0.8,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── VERTICAL BACK ──────────────────────────────────────────────────────────
const VerticalBack = ({
  dark,
  studentId,
  firstName,
  lastName,
}: {
  dark: boolean;
  studentId: string;
  firstName: string;
  lastName: string;
}) => (
  <div
    className={`id-card-vertical flex flex-col ${dark ? 'card-dark security-bg-dark' : 'card-light security-bg'}`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {/* Scannable Barcode */}
    <div
      style={{
        height: '0.55in',
        background: '#FFFFFF',
        marginTop: '0.2in',
        width: '100%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.05in 0',
        borderTop: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Barcode
        value={studentId || 'MS-00-00000000'}
        displayValue={false}
        width={1.5}
        height={35}
        margin={0}
        background="#FFFFFF"
        lineColor="#000000"
      />
    </div>

    {/* Signature strip */}
    <div style={{ padding: '0.12in 0.2in 0', flexShrink: 0 }}>
      <div
        style={{
          background: dark ? 'rgba(255,255,255,0.06)' : '#f7f5f0',
          border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          borderRadius: '0.02in',
          padding: '0.06in 0.08in 0.04in',
        }}
      >
        <div
          style={{
            height: '0.22in',
            borderBottom: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            fontSize: '0.3rem',
            color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '0.04in',
          }}
        >
          Authorized Holder Signature
        </div>
      </div>
    </div>

    {/* Policy text */}
    <div style={{ padding: '0.1in 0.2in', flexShrink: 0 }}>
      <div
        style={{
          fontSize: '0.35rem',
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        <span style={{ fontWeight: 800, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', display: 'block', marginBottom: '0.05in', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.32rem' }}>
          Official Policy
        </span>
        This card is the property of Maestro University and must be surrendered upon
        request. It is issued for the personal use of the registered student and is
        non-transferable. Unauthorized use is a violation of university policy.
        If found, please return to the Office of Student Affairs.
      </div>
    </div>

    {/* Spacer */}
    <div style={{ flex: 1 }} />

    {/* QR code + URL */}
    <div
      style={{
        padding: '0 0.2in 0.15in',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.08in',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          padding: '0.06in',
          borderRadius: '0.03in',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <QRCode
          value={`https://maestrocollege.edu/verify?id=${studentId}&name=${lastName}%2C${firstName}`}
          size={68}
          level="H"
        />
      </div>
      <div
        style={{
          fontSize: '0.28rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
        }}
      >
        Scan to Verify Enrollment
      </div>

      <Divider dark={dark} />

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <div style={{ fontSize: '0.28rem', fontWeight: 700, letterSpacing: '0.12em', color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', textTransform: 'uppercase' }}>
          maestrocollege.edu
        </div>
        <div style={{ display: 'flex', gap: '0.04in' }}>
          {/* mini logo tint */}
          <div style={{ width: '0.12in', height: '0.12in', borderRadius: '50%', background: GOLD, opacity: 0.5 }} />
          <div style={{ width: '0.12in', height: '0.12in', borderRadius: '50%', border: `1px solid ${GOLD}`, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  </div>
);

// ─── HORIZONTAL FRONT ────────────────────────────────────────────────────────
const HorizontalFront = ({
  dark,
  firstName,
  lastName,
  major,
  studentId,
  issueDate,
  expiryDate,
  photoUrl,
}: {
  dark: boolean;
  firstName: string;
  lastName: string;
  major: string;
  studentId: string;
  issueDate: string;
  expiryDate: string;
  photoUrl: string | null;
}) => {
  const fmt = (d: string) =>
    d
      ? new Date(d).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
      : '--/--/----';

  return (
    <div
      className={`id-card-horizontal ${dark ? 'card-dark security-bg-dark' : 'card-light security-bg'}`}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Top header band ── */}
      <div
        style={{
          background: dark
            ? `linear-gradient(90deg, #000000 0%, #1c1c1c 100%)`
            : `linear-gradient(90deg, #111111 0%, #2c2c2c 100%)`,
          padding: '0.1in 0.18in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1in' }}>
          <MaestroLogo className="w-8 h-8 shrink-0" />
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              Maestro University
            </div>
            <div
              style={{
                fontSize: '0.3rem',
                fontWeight: 600,
                color: GOLD,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '0.03in',
              }}
            >
              Student Identification Card
            </div>
          </div>
        </div>
        {/* Hologram placeholder circle */}
        <div
          style={{
            width: '0.35in',
            height: '0.35in',
            border: `1.5px solid ${GOLD}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
            flexShrink: 0,
          }}
        >
          <div style={{ width: '0.18in', height: '0.18in', borderRadius: '50%', background: GOLD, opacity: 0.4 }} />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', padding: '0.14in 0.18in', gap: '0.16in' }}>
        {/* Photo */}
        <div
          style={{
            width: '0.95in',
            height: '1.2in',
            borderRadius: '0.04in',
            overflow: 'hidden',
            border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            background: dark ? '#1c1c1c' : '#f3f3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User size={36} color={dark ? '#333' : '#ccc'} />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Name + major */}
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 900,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: dark ? '#FFFFFF' : '#111111',
                lineHeight: 1,
              }}
            >
              {firstName} {lastName}
            </div>
            <div
              style={{
                fontSize: '0.36rem',
                fontWeight: 600,
                color: GOLD,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginTop: '0.05in',
              }}
            >
              {major}
            </div>
          </div>

          {/* Student ID */}
          <div>
            <div
              style={{
                fontSize: '0.29rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                marginBottom: '0.03in',
              }}
            >
              Student ID Number
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.78rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: dark ? '#FFFFFF' : '#111111',
              }}
            >
              {studentId || 'MS-00-00000000'}
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: 'flex', gap: '0.2in', alignItems: 'flex-start' }}>
            <Field label="Issue Date" value={fmt(issueDate)} dark={dark} />
            <Field label="Expiration" value={fmt(expiryDate)} dark={dark} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── HORIZONTAL BACK ─────────────────────────────────────────────────────────
const HorizontalBack = ({
  dark,
  studentId,
  firstName,
  lastName,
}: {
  dark: boolean;
  studentId: string;
  firstName: string;
  lastName: string;
}) => (
  <div
    className={`id-card-horizontal ${dark ? 'card-dark security-bg-dark' : 'card-light security-bg'}`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {/* Scannable Barcode */}
    <div
      style={{
        height: '0.55in',
        background: '#FFFFFF',
        marginTop: '0.2in',
        width: '100%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.05in 0',
        borderTop: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Barcode
        value={studentId || 'MS-00-00000000'}
        displayValue={false}
        width={1.5}
        height={35}
        margin={0}
        background="#FFFFFF"
        lineColor="#000000"
      />
    </div>

    {/* Body */}
    <div style={{ flex: 1, display: 'flex', padding: '0.12in 0.18in', gap: '0.16in', alignItems: 'stretch' }}>
      {/* Policy + URL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Signature strip */}
          <div
            style={{
              background: dark ? 'rgba(255,255,255,0.04)' : '#f7f5f0',
              border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
              padding: '0.05in 0.07in 0.03in',
              borderRadius: '0.02in',
              marginBottom: '0.1in',
            }}
          >
            <div style={{ height: '0.18in', borderBottom: dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.18)' }} />
            <div style={{ fontSize: '0.27rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginTop: '0.03in' }}>
              Authorized Holder Signature
            </div>
          </div>

          <div
            style={{
              fontSize: '0.33rem',
              color: dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)',
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            <span style={{ fontWeight: 800, color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)', display: 'block', marginBottom: '0.04in', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.3rem' }}>
              Institutional Property
            </span>
            This card is the property of Maestro University. It is non-transferable and
            must be presented upon request. Misuse may result in disciplinary action.
          </div>
        </div>

        <div style={{ fontSize: '0.29rem', fontWeight: 700, letterSpacing: '0.14em', color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', textTransform: 'uppercase' }}>
          maestrocollege.edu
        </div>
      </div>

      {/* Vertical divider */}
      <div style={{ width: '1px', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', flexShrink: 0 }} />

      {/* QR code */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.07in', flexShrink: 0 }}>
        <div
          style={{
            background: '#FFFFFF',
            padding: '0.05in',
            borderRadius: '0.02in',
          }}
        >
          <QRCode
            value={`https://maestrocollege.edu/verify?id=${studentId}&name=${lastName}%2C${firstName}`}
            size={62}
            level="H"
          />
        </div>
        <div style={{ fontSize: '0.27rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}>
          Verify Enrollment
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Kay');
  const [studentId, setStudentId] = useState('MS-26-25174855');
  const [major, setMajor] = useState('Software Engineering');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('vertical');

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 4);
  const [expiryDate, setExpiryDate] = useState(nextYear.toISOString().split('T')[0]);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');

  const dark = cardTheme === 'dark';

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const inputCls =
    'block w-full rounded-lg border border-[#2a2a2a] bg-[#161616] text-white py-2.5 px-3 text-sm focus:ring-1 focus:ring-[#B8963E] focus:border-[#B8963E] transition-colors outline-none';
  const inputWithIconCls = 'pl-10 ' + inputCls;
  const labelCls = 'block text-[0.65rem] font-bold text-gray-500 uppercase tracking-widest mb-1.5';

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 font-sans flex flex-col md:flex-row">
      {/* ── Left pane: controls ── */}
      <div className="w-full md:w-[380px] lg:w-[420px] bg-[#0e0e0e] border-r border-[#1c1c1c] p-7 overflow-y-auto no-print flex-shrink-0 relative">
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <MaestroLogo className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight leading-tight">Maestro University</h1>
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              ID Card Generator
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-5">
          {/* Layout + Theme toggles */}
          <div className="space-y-2">
            <p className={labelCls}>Format</p>
            <div className="grid grid-cols-2 gap-2">
              {(['vertical', 'horizontal'] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setOrientation(o)}
                  className={`py-2 px-3 rounded-lg text-[0.65rem] font-black uppercase tracking-widest border transition-all ${
                    orientation === o
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] bg-[#161616] text-gray-500 hover:text-gray-300 hover:border-[#444]'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setCardTheme(t)}
                  className={`py-2 px-3 rounded-lg text-[0.65rem] font-black uppercase tracking-widest border transition-all ${
                    cardTheme === t
                      ? 'text-black border-[#B8963E] bg-[#B8963E]'
                      : 'border-[#2a2a2a] bg-[#161616] text-gray-500 hover:text-gray-300 hover:border-[#444]'
                  }`}
                >
                  {t === 'light' ? '☀ Light' : '☾ Dark'}
                </button>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <p className={labelCls}>Student Photo</p>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#2a2a2a] rounded-xl py-6 bg-[#111] hover:border-[#B8963E]/50 transition-colors cursor-pointer"
            >
              <AnimatePresence mode="popLayout">
                {photoUrl ? (
                  <motion.div key="preview" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
                    <img src={photoUrl} alt="Preview" className="w-24 h-28 object-cover rounded-lg border border-[#333]" />
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload size={18} className="text-white" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2 text-gray-600">
                    <Upload size={28} />
                    <span className="text-xs font-medium text-gray-500">Click to upload photo</span>
                    <span className="text-[0.6rem] text-gray-700">PNG, JPG up to 5MB</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <input id="file-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
            </label>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputWithIconCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label className={labelCls}>Student ID Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
              <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputWithIconCls} />
            </div>
          </div>

          {/* Major */}
          <div>
            <label className={labelCls}>Program / Major</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
              <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className={inputWithIconCls} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Issue Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
                <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className={inputWithIconCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className={inputWithIconCls} />
              </div>
            </div>
          </div>

          {/* Print */}
          <div className="pt-2">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: GOLD, color: '#000000' }}
            >
              <Printer size={16} />
              Print ID Card
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Right pane: preview ── */}
      <div className="flex-1 bg-[#080808] flex flex-col items-center justify-center p-10 overflow-y-auto relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none no-print">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: GOLD, filter: 'blur(80px)' }} />
        </div>

        {/* Live badge */}
        <div className="no-print absolute top-6 right-6 flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-widest text-white bg-[#161616] border border-[#2a2a2a] px-3.5 py-1.5 rounded-full z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live Preview
        </div>

        {/* Cards */}
        <div className={`print-section flex ${orientation === 'horizontal' ? 'flex-col' : 'flex-col lg:flex-row'} gap-8 items-center justify-center z-10`}>
          <AnimatePresence mode="wait">
            {orientation === 'vertical' ? (
              <motion.div
                key="vertical"
                initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: 8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col lg:flex-row gap-8 items-center"
              >
                <VerticalFront
                  dark={dark}
                  firstName={firstName}
                  lastName={lastName}
                  major={major}
                  studentId={studentId}
                  issueDate={issueDate}
                  expiryDate={expiryDate}
                  photoUrl={photoUrl}
                />
                <VerticalBack
                  dark={dark}
                  studentId={studentId}
                  firstName={firstName}
                  lastName={lastName}
                />
              </motion.div>
            ) : (
              <motion.div
                key="horizontal"
                initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateX: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col gap-8 items-center"
              >
                <HorizontalFront
                  dark={dark}
                  firstName={firstName}
                  lastName={lastName}
                  major={major}
                  studentId={studentId}
                  issueDate={issueDate}
                  expiryDate={expiryDate}
                  photoUrl={photoUrl}
                />
                <HorizontalBack
                  dark={dark}
                  studentId={studentId}
                  firstName={firstName}
                  lastName={lastName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
