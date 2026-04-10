/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Upload, Printer, Download, User, CreditCard, Calendar, Building, LayoutTemplate } from 'lucide-react';

const MaestroLogo = ({ className = "w-8 h-8", shieldColor = "#F2EFE9", squareColor = "#1A1A1A" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 95C50 95 15 75 15 40V20C30 15 50 10 50 10C50 10 70 15 85 20V40C85 75 50 95 50 95Z" fill={shieldColor} />
    <g fill={squareColor}>
      <rect x="39" y="35" width="10" height="10" rx="1" />
      <rect x="51" y="35" width="10" height="10" rx="1" />
      <rect x="33" y="47" width="10" height="10" rx="1" />
      <rect x="45" y="47" width="10" height="10" rx="1" />
      <rect x="57" y="47" width="10" height="10" rx="1" />
      <rect x="39" y="59" width="10" height="10" rx="1" />
      <rect x="51" y="59" width="10" height="10" rx="1" />
      <rect x="45" y="71" width="10" height="10" rx="1" />
    </g>
  </svg>
);

export default function App() {
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Kay');
  const [studentId, setStudentId] = useState('MS-26-25174855');
  const [major, setMajor] = useState('AAS - AI Software Engineering');
  const [dob, setDob] = useState('1993-08-05');
  const [issueDate, setIssueDate] = useState('2026-04-06');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  
  const [expiryDate, setExpiryDate] = useState('2028-03-12');
  
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col md:flex-row">
      {/* Left Pane: Form (No Print) */}
      <div className="w-full md:w-1/2 lg:w-5/12 bg-white border-r border-gray-200 p-8 overflow-y-auto no-print shadow-sm z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-maestro-dark rounded-xl flex items-center justify-center shadow-sm">
              <MaestroLogo className="w-8 h-8" shieldColor="#F2EFE9" squareColor="#1A1A1A" />
            </div>
            <div>
              <h1 className="text-2xl font-sans font-bold text-maestro-dark leading-tight lowercase tracking-tight">maestro college</h1>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">ID Card Generator</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Orientation Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Card Orientation</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:border-maestro-dark transition-colors">
                  <input type="radio" name="orientation" value="horizontal" checked={orientation === 'horizontal'} onChange={() => setOrientation('horizontal')} className="text-maestro-dark focus:ring-maestro-dark w-4 h-4" />
                  <span className="text-sm font-medium">Horizontal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:border-maestro-dark transition-colors">
                  <input type="radio" name="orientation" value="vertical" checked={orientation === 'vertical'} onChange={() => setOrientation('vertical')} className="text-maestro-dark focus:ring-maestro-dark w-4 h-4" />
                  <span className="text-sm font-medium">Vertical</span>
                </label>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Student Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-maestro-dark transition-colors bg-gray-50">
                <div className="space-y-1 text-center">
                  {photoUrl ? (
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-maestro-dark hover:text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-maestro-dark px-3 py-1 border border-gray-200 shadow-sm">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            </div>

            {/* Student Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Student ID Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Major / Program</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="block w-full rounded-lg border-gray-300 bg-gray-50 border py-2 px-3 text-sm focus:ring-maestro-dark focus:border-maestro-dark" />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 bg-maestro-dark text-maestro-cream py-3 px-4 rounded-xl font-semibold hover:bg-black transition-colors shadow-md hover:shadow-lg"
              >
                <Printer size={18} />
                Print ID Card
              </button>
              <p className="text-xs text-center text-gray-500 mt-3">
                For best results, print on standard CR80 card stock or print on paper and fold.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Preview & Print Area */}
      <div className="w-full md:w-1/2 lg:w-7/12 bg-gray-100 flex flex-col items-center justify-center p-8 overflow-y-auto relative">
        <div className="no-print absolute top-8 right-8 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Live Preview
        </div>

        {/* This section will be printed */}
        <div className={`print-section flex ${orientation === 'horizontal' ? 'flex-col' : 'flex-col md:flex-row'} gap-8 items-center justify-center`}>
          
          {orientation === 'vertical' ? (
            <>
              {/* Vertical Front of Card */}
              <div className="id-card-vertical flex flex-col">
                {/* Header */}
                <div className="bg-maestro-dark text-maestro-cream p-4 flex flex-col items-center justify-center relative h-[1.2in]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-maestro-cream opacity-20"></div>
                  <MaestroLogo className="w-10 h-10 mb-1" shieldColor="#F2EFE9" squareColor="#1A1A1A" />
                  <h2 className="font-sans font-bold text-lg leading-tight tracking-tight text-center lowercase">maestro<br/>college</h2>
                  <div className="text-[0.45rem] tracking-widest uppercase text-maestro-cream opacity-70 mt-1 font-semibold">Student Identification</div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col items-center pt-4 px-4 pb-2 relative bg-white">
                  {/* Photo */}
                  <div className="w-[1.1in] h-[1.1in] rounded-full overflow-hidden border-[3px] border-white shadow-md bg-gray-200 z-10 -mt-[0.6in] flex-shrink-0">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={40} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mt-3 text-center w-full">
                    <h3 className="font-bold text-maestro-dark text-lg leading-tight uppercase tracking-wide">{firstName} {lastName}</h3>
                    <p className="text-gray-600 font-semibold text-[0.65rem] mt-0.5 uppercase tracking-wider leading-snug">{major}</p>
                    
                    <div className="mt-4 bg-gray-50 rounded-md py-1.5 px-2 border border-gray-100">
                      <p className="text-[0.55rem] text-gray-500 uppercase tracking-wider font-semibold">Student ID</p>
                      <p className="font-mono font-bold text-maestro-dark text-sm tracking-widest">{studentId || '---'}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto w-full flex justify-between items-end border-t border-gray-100 pt-2 pb-1">
                    <div>
                      <p className="text-[0.4rem] text-gray-400 uppercase font-bold">DOB</p>
                      <p className="text-[0.55rem] font-semibold text-gray-700">{dob ? new Date(dob).toLocaleDateString() : '---'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[0.4rem] text-gray-400 uppercase font-bold">Issued</p>
                      <p className="text-[0.55rem] font-semibold text-gray-700">{issueDate ? new Date(issueDate).toLocaleDateString() : '---'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.4rem] text-gray-400 uppercase font-bold">Expires</p>
                      <p className="text-[0.55rem] font-semibold text-gray-700">{expiryDate ? new Date(expiryDate).toLocaleDateString() : '---'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Back of Card */}
              <div className="id-card-vertical flex flex-col bg-gray-50">
                {/* Magnetic Stripe Placeholder */}
                <div className="h-[0.4in] w-full bg-gray-800 mt-[0.3in]"></div>
                
                <div className="flex-1 p-4 flex flex-col">
                  <div className="text-[0.45rem] text-gray-600 leading-relaxed text-justify mb-4">
                    This card is the property of Maestro College and must be surrendered upon request. It is issued for the personal use of the student named on the front and is non-transferable. If found, please return to:
                    <br/><br/>
                    <strong>Maestro College Card Services</strong><br/>
                    123 Academic Way, Suite 100<br/>
                    Knowledge City, ST 12345<br/>
                    (555) 019-8372
                  </div>

                  <div className="mt-auto flex flex-col items-center justify-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-2">
                      <QRCode 
                        value={`mc:student:${studentId}:${firstName.toLowerCase()}.${lastName.toLowerCase()}`} 
                        size={80} 
                        level="M"
                      />
                    </div>
                    <p className="font-mono text-[0.5rem] text-gray-500 tracking-widest">{studentId}</p>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-[0.4rem] text-gray-400 uppercase tracking-widest">www.maestro.edu</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Horizontal Front of Card */}
              <div className="id-card-horizontal flex flex-col bg-white">
                {/* Header */}
                <div className="bg-maestro-dark text-maestro-cream px-4 py-2.5 flex items-center justify-between relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-maestro-cream opacity-20"></div>
                  <div className="flex items-center gap-2 mt-1">
                    <MaestroLogo className="w-6 h-6" shieldColor="#F2EFE9" squareColor="#1A1A1A" />
                    <h2 className="font-sans font-bold text-sm leading-tight tracking-tight lowercase">maestro college</h2>
                  </div>
                  <div className="text-[0.45rem] tracking-widest uppercase text-maestro-cream opacity-70 font-semibold mt-1">Student ID</div>
                </div>
                
                {/* Body */}
                <div className="flex-1 flex p-4 gap-5">
                  {/* Photo */}
                  <div className="w-[1.1in] h-[1.3in] bg-gray-200 rounded-md overflow-hidden border-2 border-gray-100 shadow-sm flex-shrink-0">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={36} />
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-maestro-dark text-lg leading-tight uppercase tracking-wide">{firstName} {lastName}</h3>
                    <p className="text-gray-600 font-semibold text-[0.65rem] mt-0.5 uppercase tracking-wider leading-snug">{major}</p>
                    
                    <div className="mt-3">
                      <p className="text-[0.5rem] text-gray-500 uppercase tracking-wider font-semibold">Student ID</p>
                      <p className="font-mono font-bold text-maestro-dark text-sm tracking-widest">{studentId || '---'}</p>
                    </div>

                    <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-1.5">
                      <div>
                        <p className="text-[0.4rem] text-gray-400 uppercase font-bold">DOB</p>
                        <p className="text-[0.55rem] font-semibold text-gray-700">{dob ? new Date(dob).toLocaleDateString() : '---'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[0.4rem] text-gray-400 uppercase font-bold">Issued</p>
                        <p className="text-[0.55rem] font-semibold text-gray-700">{issueDate ? new Date(issueDate).toLocaleDateString() : '---'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.4rem] text-gray-400 uppercase font-bold">Expires</p>
                        <p className="text-[0.55rem] font-semibold text-gray-700">{expiryDate ? new Date(expiryDate).toLocaleDateString() : '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Back of Card */}
              <div className="id-card-horizontal flex flex-col bg-gray-50">
                <div className="h-[0.4in] w-full bg-gray-800 mt-[0.25in]"></div>
                <div className="flex-1 p-4 flex gap-4 items-center">
                  <div className="flex-1 text-[0.45rem] text-gray-600 leading-relaxed text-justify">
                    This card is the property of Maestro College and must be surrendered upon request. It is issued for the personal use of the student named on the front and is non-transferable. If found, please return to:
                    <br/><br/>
                    <strong>Maestro College Card Services</strong><br/>
                    123 Academic Way, Suite 100<br/>
                    Knowledge City, ST 12345<br/>
                    (555) 019-8372
                    <div className="mt-2 text-left">
                      <p className="text-[0.4rem] text-gray-400 uppercase tracking-widest">www.maestro.edu</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[1in]">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-200 mb-1">
                      <QRCode 
                        value={`mc:student:${studentId}:${firstName.toLowerCase()}.${lastName.toLowerCase()}`} 
                        size={64} 
                        level="M"
                      />
                    </div>
                    <p className="font-mono text-[0.45rem] text-gray-500 tracking-widest">{studentId}</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
