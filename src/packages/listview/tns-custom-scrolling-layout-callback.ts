export class TNS_CustomScrollingLayoutCallback extends android.support.wear
  .widget.WearableLinearLayoutManager.LayoutCallback {
  /** How much should we scale the icon at most. */
  private static MAX_ICON_PROGRESS = 2;

  constructor() {
    super();
  }

  onLayoutFinished(
    child: android.view.View,
    parent: android.support.v7.widget.RecyclerView
  ) {
    const centerOffset = child.getHeight() / 2.0 / parent.getHeight();
    const yRelativeToCenterOffset =
      child.getY() / parent.getHeight() + centerOffset;

    const progresstoCenter = Math.sin(yRelativeToCenterOffset * Math.PI);

    let mProgressToCenter = Math.abs(0.5 - yRelativeToCenterOffset);

    mProgressToCenter = Math.min(
      mProgressToCenter,
      TNS_CustomScrollingLayoutCallback.MAX_ICON_PROGRESS
    );

    child.setScaleX(1 - mProgressToCenter);
    child.setScaleY(1 - mProgressToCenter);
    child.setX(+(1 - progresstoCenter) * 100);
  }
}
