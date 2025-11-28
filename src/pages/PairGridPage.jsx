import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PairChecklistContext } from '../context/PairChecklistContext';
import { ThemeContext } from '../context/ThemeContext';

const PairGridPage = () => {
    const { pairs, statuses, calculatePairScore, addNewPair, duplicatePair, deletePair } = useContext(PairChecklistContext);
    const { darkMode } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [addPairModalOpen, setAddPairModalOpen] = useState(false);
    const [newPairName, setNewPairName] = useState('');

    const filteredPairs = pairs.filter(pair => {
        const matchesSearch = pair.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || pair.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddPair = () => {
        if (newPairName.trim()) {
            addNewPair(newPairName.trim());
            setNewPairName('');
            setAddPairModalOpen(false);
        }
    };

    const getStatusColor = (statusId) => {
        const status = statuses.find(s => s.id === statusId);
        return status ? status.color : 'bg-slate-500';
    };

    const getStatusName = (statusId) => {
        const status = statuses.find(s => s.id === statusId);
        return status ? status.name : 'Unknown';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Currency Pair Tracker</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Track and manage checklists for each currency pair</p>
                </div>
                <button
                    onClick={() => setAddPairModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg text-white font-medium flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Pair
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search currency pairs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-slate-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${statusFilter === 'all'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700'
                            }`}
                    >
                        All
                    </button>
                    {statuses.map((status) => (
                        <button
                            key={status.id}
                            onClick={() => setStatusFilter(status.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${statusFilter === status.id
                                    ? `${status.color} text-white`
                                    : 'bg-white dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700'
                                }`}
                        >
                            {status.name}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPairs.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg p-12 text-center border border-slate-200 dark:border-dark-700">
                    <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-dark-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">No currency pairs found</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Try changing your search or filter, or add a new currency pair.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setAddPairModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                        >
                            Add Currency Pair
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPairs.map((pair, index) => {
                        const scores = calculatePairScore(pair);
                        const statusColor = getStatusColor(pair.status);
                        const statusName = getStatusName(pair.status);

                        return (
                            <motion.div
                                key={pair.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-white to-slate-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-dark-700 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pair.name}</h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                                    Last updated: {new Date(pair.lastUpdated).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor} text-white`}>
                                                {statusName}
                                            </span>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">Confluence Score</span>
                                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{scores.total}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-dark-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full"
                                                    style={{ width: `${scores.total}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-2 mb-4">
                                            <div className="text-center">
                                                <div className="text-xs text-slate-600 dark:text-slate-400">W</div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{scores.weekly}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-slate-600 dark:text-slate-400">D</div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{scores.daily}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-slate-600 dark:text-slate-400">4H</div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{scores.fourHour}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-slate-600 dark:text-slate-400">2H</div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{scores.lowerTimeframes}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-slate-600 dark:text-slate-400">E</div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">{scores.entry}</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {pair.checklist.stopLoss && pair.checklist.takeProfit ? (
                                                    <span>SL: {pair.checklist.stopLoss} | TP: {pair.checklist.takeProfit}</span>
                                                ) : (
                                                    <span>No SL/TP set</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between gap-2">
                                            <Link
                                                to={`/pair/${pair.id}`}
                                                className="flex-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors text-center"
                                            >
                                                View Checklist
                                            </Link>
                                            <button
                                                onClick={() => duplicatePair(pair.id)}
                                                className={`p-2 bg-slate-200 ${(pair.status === 'closed' || pair.status === 'canceled') || "cursor-not-allowed"} hover:bg-slate-300 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-lg transition-colors`}
                                                title={(pair.status === 'closed' || pair.status === 'canceled')? "Duplicate Pair":"Closse or Cancel the Pair to make a copy" }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => deletePair(pair.id)}
                                                className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                                title="Delete Pair"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Add Pair Modal */}
            {addPairModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setAddPairModalOpen(false)}
                    ></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl max-w-md w-full"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Currency Pair</h3>
                                <button
                                    onClick={() => setAddPairModalOpen(false)}
                                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Currency Pair Name
                                </label>
                                <input
                                    type="text"
                                    value={newPairName}
                                    onChange={(e) => setNewPairName(e.target.value)}
                                    placeholder="e.g., EUR/USD"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-dark-600 rounded-md bg-white dark:bg-dark-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-4">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        You can add multiple entries for the same currency pair with different statuses.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-dark-700">
                                <button
                                    type="button"
                                    onClick={() => setAddPairModalOpen(false)}
                                    className="px-4 py-2 border border-slate-300 dark:border-dark-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-dark-700 hover:bg-slate-50 dark:hover:bg-dark-600 focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddPair}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none"
                                >
                                    Add Pair
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PairGridPage;