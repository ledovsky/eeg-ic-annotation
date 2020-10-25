import mne
import numpy as np
import matplotlib.pyplot as plt


def plot_topomap(ica_component, ch_names):

    fig, ax = plt.subplots()

    head_pos = None
    outlines = 'head'

    res = 64
    contours = 6
    sensors = True
    image_interp = 'bilinear'
    show = True
    extrapolate = 'box'
    head_pos = None
    border = 0

    # channels_to_use = [ch.lower() for ch in ica_epochs.info['ch_names']]
    channels_to_use = ch_names

    ten_twenty_montage = mne.channels.make_standard_montage('standard_1020')

    # get channels in format of ten_twenty_montage in right order
    ten_twenty_montage_channels = {ch.lower(): ch for ch in ten_twenty_montage.ch_names}
    channels_to_use_ = [ten_twenty_montage_channels[ch] for ch in channels_to_use]

    # create Info object to store info
    info = mne.io.meas_info.create_info(channels_to_use_, sfreq=256, ch_types="eeg")

    # using temporary RawArray to apply mongage to info
    mne.io.RawArray(np.zeros((len(channels_to_use_), 1)), info, copy=None).set_montage(ten_twenty_montage)

    # pick channels
    channels_to_use_ = [ch for ch in info.ch_names if ch.lower() in channels_to_use]
    info.pick_channels(channels_to_use_)

    data_picks, pos, merge_channels, names, _, sphere, clip_origin = mne.viz.topomap._prepare_topomap_plot(info, 'eeg')

    outlines = mne.viz.topomap._make_head_outlines(sphere, pos, outlines, clip_origin)

    mne.viz.topomap.plot_topomap(
        ica_component.ravel(), pos, res=res,
        outlines=outlines, contours=contours, sensors=sensors,
        image_interp=image_interp, show=show, extrapolate=extrapolate,
        sphere=sphere, border=border, axes=ax
    )

    return fig