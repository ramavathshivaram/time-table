import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    nodes: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          type: {
            type: String,
            enum: ["start", "college", "branch", "year", "section"],
            required: true,
          },

          position: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
          },

          data: {
            label: { type: String, required: true },
            type: { type: String, required: true },
          },
        },
      ],
      default: [],
    },

    edges: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          source: {
            type: String,
            required: true,
          },

          target: {
            type: String,
            required: true,
          },

          sourceHandle: String,
          targetHandle: String,

          type: {
            type: String,
            default: "bezier",
          },
        },
      ],
      default: [],
    },

    faculties: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          name: {
            type: String,
            required: true,
          },

          subjects: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },

    subjects: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          name: {
            type: String,
            required: true,
          },

          duration: {
            type: Number,
            required: true,
          },

          isLab: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },

    rooms: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },

          name: {
            type: String,
            required: true,
          },

          roomNumber: {
            type: String,
            required: true,
          },

          isLab: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },

    messages: {
      type: [
        {
          role: {
            type: String,
            enum: ["user", "assistant"],
          },

          content: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

workflowSchema.index({ "nodes.id": 1 });
workflowSchema.index({ "subjects.id": 1 });
workflowSchema.index({ "faculties.id": 1 });
workflowSchema.index({ "rooms.id": 1 });

export default mongoose.model("Workflow", workflowSchema);
