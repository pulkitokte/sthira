// src/data/morningFlowIllustrations.js
// Registry mapping exercise.id → illustration component.
// MorningFlowExerciseIllustration.jsx renders this lookup instead of a
// placeholder icon. Adding an illustration for a future exercise is a
// two-step process: create the component under
// src/components/morningFlow/illustrations/, then add one line here —
// no changes needed anywhere else in the player.

import NeckRollIllustration from "../components/morningFlow/illustrations/NeckRollIllustration";
import ShoulderRollIllustration from "../components/morningFlow/illustrations/ShoulderRollIllustration";
import ArmCircleIllustration from "../components/morningFlow/illustrations/ArmCircleIllustration";
import MarchInPlaceIllustration from "../components/morningFlow/illustrations/MarchInPlaceIllustration";
import HipCircleIllustration from "../components/morningFlow/illustrations/HipCircleIllustration";
import AnkleMobilityIllustration from "../components/morningFlow/illustrations/AnkleMobilityIllustration";
import GentleTwistIllustration from "../components/morningFlow/illustrations/GentleTwistIllustration";

import CatCowIllustration from "../components/morningFlow/illustrations/CatCowIllustration";
import ThoracicRotationIllustration from "../components/morningFlow/illustrations/ThoracicRotationIllustration";
import WorldsGreatestStretchIllustration from "../components/morningFlow/illustrations/WorldsGreatestStretchIllustration";
import HipFlexorStretchIllustration from "../components/morningFlow/illustrations/HipFlexorStretchIllustration";
import HamstringMobilityIllustration from "../components/morningFlow/illustrations/HamstringMobilityIllustration";
import SpinalRotationIllustration from "../components/morningFlow/illustrations/SpinalRotationIllustration";

import BodyweightSquatIllustration from "../components/morningFlow/illustrations/BodyweightSquatIllustration";
import WallPushupIllustration from "../components/morningFlow/illustrations/WallPushupIllustration";
import GluteBridgeIllustration from "../components/morningFlow/illustrations/GluteBridgeIllustration";
import BirdDogIllustration from "../components/morningFlow/illustrations/BirdDogIllustration";
import SupermanHoldIllustration from "../components/morningFlow/illustrations/SupermanHoldIllustration";
import DeadBugIllustration from "../components/morningFlow/illustrations/DeadBugIllustration";
import StandingCalfRaiseIllustration from "../components/morningFlow/illustrations/StandingCalfRaiseIllustration";

import SingleLegBalanceIllustration from "../components/morningFlow/illustrations/SingleLegBalanceIllustration";
import HeelToeWalkIllustration from "../components/morningFlow/illustrations/HeelToeWalkIllustration";
import StandingReachIllustration from "../components/morningFlow/illustrations/StandingReachIllustration";
import TreePoseIllustration from "../components/morningFlow/illustrations/TreePoseIllustration";
import WeightShiftIllustration from "../components/morningFlow/illustrations/WeightShiftIllustration";

import ForwardFoldIllustration from "../components/morningFlow/illustrations/ForwardFoldIllustration";
import ChildPoseIllustration from "../components/morningFlow/illustrations/ChildPoseIllustration";
import ChestStretchIllustration from "../components/morningFlow/illustrations/ChestStretchIllustration";
import QuadStretchIllustration from "../components/morningFlow/illustrations/QuadStretchIllustration";
import BreathingRecoveryIllustration from "../components/morningFlow/illustrations/BreathingRecoveryIllustration";
import NeckStretchIllustration from "../components/morningFlow/illustrations/NeckStretchIllustration";

export const MORNING_FLOW_ILLUSTRATIONS = {
  "warmup-neck-rolls": NeckRollIllustration,
  "warmup-shoulder-rolls": ShoulderRollIllustration,
  "warmup-arm-circles": ArmCircleIllustration,
  "warmup-march-in-place": MarchInPlaceIllustration,
  "warmup-hip-circles": HipCircleIllustration,
  "warmup-ankle-mobility": AnkleMobilityIllustration,
  "warmup-gentle-twists": GentleTwistIllustration,

  "mobility-cat-cow": CatCowIllustration,
  "mobility-thoracic-rotation": ThoracicRotationIllustration,
  "mobility-worlds-greatest-stretch": WorldsGreatestStretchIllustration,
  "mobility-hip-flexor-stretch": HipFlexorStretchIllustration,
  "mobility-hamstring-mobility": HamstringMobilityIllustration,
  "mobility-spinal-rotation": SpinalRotationIllustration,

  "strength-bodyweight-squats": BodyweightSquatIllustration,
  "strength-wall-pushups": WallPushupIllustration,
  "strength-glute-bridge": GluteBridgeIllustration,
  "strength-bird-dog": BirdDogIllustration,
  "strength-superman-hold": SupermanHoldIllustration,
  "strength-dead-bug": DeadBugIllustration,
  "strength-standing-calf-raises": StandingCalfRaiseIllustration,

  "balance-single-leg-balance": SingleLegBalanceIllustration,
  "balance-heel-toe-walk": HeelToeWalkIllustration,
  "balance-standing-reach": StandingReachIllustration,
  "balance-tree-pose": TreePoseIllustration,
  "balance-weight-shift": WeightShiftIllustration,

  "cooldown-forward-fold": ForwardFoldIllustration,
  "cooldown-child-pose": ChildPoseIllustration,
  "cooldown-chest-stretch": ChestStretchIllustration,
  "cooldown-quad-stretch": QuadStretchIllustration,
  "cooldown-breathing-recovery": BreathingRecoveryIllustration,
  "cooldown-neck-stretch": NeckStretchIllustration,
};
