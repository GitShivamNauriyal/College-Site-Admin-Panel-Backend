import prisma from '../DB/db.config.js';
import { noticeStructure } from '../Transform/noticeStructure.js';

export const reteriveNotices = async (req, res) => {
    try {
        // Fetch notices sorted by 'createdAt' in descending order (latest first)
        const notices = await prisma.notice.findMany({
            orderBy: {
                createdAt: 'desc', 
            },
        });

        // Map each notice to the transformed structure
        const detailTransform = notices.map((item) => noticeStructure(item));
          console.log(detailTransform);
        return res.status(200).json({
            status: 200,
            notices: detailTransform,
        });
    } catch (error) {
        console.error("Error retrieving Notices", error);

        // Send an error response if data retrieval fails
        res.status(500).json({
            error: "Failed to retrieve Notices",
        });
    }
};


export const reteriveNoticeByDate = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: "Please provide a valid date in the query (e.g., ?date=YYYY-MM-DD)" });
        }

        // Parse the date to get the start and end of the specified day
        const startDate = new Date(date);
        const endDate = new Date(new Date(date).setHours(23, 59, 59, 999));

        // Fetch notices created within the specified date range
        const notices = await prisma.notice.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Transform each notice
        const detailTransform = notices.map((item) => noticeStructure(item));

        return res.status(200).json({
            status: 200,
            notices: detailTransform,
        });
    } catch (error) {
        console.error("Error retrieving notices:", error);
        return res.status(500).json({ error: "Failed to retrieve notices" });
    }
};


